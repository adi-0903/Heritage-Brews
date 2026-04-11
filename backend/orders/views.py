from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Order, OrderItem
from .serializers import (
    CartSerializer, CartItemSerializer, AddToCartSerializer,
    UpdateCartItemSerializer, OrderSerializer, PlaceOrderSerializer,
)
from decimal import Decimal
from catalog.models import Product, GiftHamper
from memberships.models import MembershipTier


def get_or_create_cart(request):
    """Get the cart for the current user or session."""
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return cart
    # For guests, use session
    if not request.session.session_key:
        request.session.create()
    cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart


class CartView(APIView):
    """
    GET /api/cart/ — View current cart
    """
    permission_classes = [AllowAny]

    def get(self, request):
        cart = get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartItemAddView(APIView):
    """
    POST /api/cart/items/ — Add item to cart
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(Product, id=serializer.validated_data['product_id'], is_available=True)
        cart = get_or_create_cart(request)
        qty = serializer.validated_data['quantity']

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += qty
        else:
            cart_item.quantity = qty
        cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class CartItemUpdateView(APIView):
    """
    PUT    /api/cart/items/<id>/ — Update item quantity
    DELETE /api/cart/items/<id>/ — Remove item
    """
    permission_classes = [AllowAny]

    def put(self, request, pk):
        cart = get_or_create_cart(request)
        cart_item = get_object_or_404(CartItem, id=pk, cart=cart)
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_qty = serializer.validated_data['quantity']
        if new_qty <= 0:
            cart_item.delete()
        else:
            cart_item.quantity = new_qty
            cart_item.save()

        return Response(CartSerializer(cart).data)

    def delete(self, request, pk):
        cart = get_or_create_cart(request)
        cart_item = get_object_or_404(CartItem, id=pk, cart=cart)
        cart_item.delete()
        return Response(CartSerializer(cart).data)


class CartClearView(APIView):
    """DELETE /api/cart/clear/ — Clear entire cart."""
    permission_classes = [AllowAny]

    def delete(self, request):
        cart = get_or_create_cart(request)
        cart.items.all().delete()
        return Response(CartSerializer(cart).data)


# ──────────────── Orders ────────────────

class OrderListView(APIView):
    """
    GET  /api/orders/     — List user's orders
    POST /api/orders/     — Place a new order from cart
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)



    def post(self, request):
        serializer = PlaceOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        passed_items = data.get('items', [])
        cart_items_data = []

        if passed_items:
            # Create order from items passed in the request body
            for item in passed_items:
                item_id = str(item.get('product', ''))
                
                # Check if it's a membership purchase
                if item_id.startswith('MEMB-'):
                    slug = item_id.replace('MEMB-', '')
                    tier = MembershipTier.objects.filter(slug=slug).first()
                    if tier:
                        cart_items_data.append({
                            'product': None,
                            'membership_tier': tier,
                            'is_hamper': False,
                            'name': f"{tier.title} Membership",
                            'quantity': 1,
                            'price': tier.price
                        })
                    else:
                        return Response({'error': f'Membership tier {slug} not found.'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    product = Product.objects.filter(id=item_id, is_available=True).first()
                    if product:
                        cart_items_data.append({
                            'product': product,
                            'membership_tier': None,
                            'is_hamper': False,
                            'name': product.name,
                            'quantity': int(item['quantity']),
                            'price': product.price
                        })
                    else:
                        hamper = GiftHamper.objects.filter(id=item_id, is_active=True).first()
                        if hamper:
                            cart_items_data.append({
                                'product': None,
                                'membership_tier': None,
                                'is_hamper': True,
                                'name': hamper.name,
                                'quantity': int(item['quantity']),
                                'price': hamper.price
                            })
                        else:
                            return Response({'error': f'Item with ID {item_id} not found.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Fallback to backend cart
            try:
                cart = Cart.objects.get(user=request.user)
                db_items = cart.items.select_related('product').all()
                if not db_items.exists():
                     return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)
                for item in db_items:
                    cart_items_data.append({
                        'product': item.product,
                        'membership_tier': None,
                        'is_hamper': False,
                        'name': item.product.name,
                        'quantity': item.quantity,
                        'price': item.product.price
                    })
                cart.items.all().delete()
            except Cart.DoesNotExist:
                return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate totals from the collected items (using Decimal)
        raw_subtotal = sum(item['price'] * item['quantity'] for item in cart_items_data)
        
        # Calculate Premium/Lineage Discount
        discount_amount = Decimal('0.00')
        active_membership = getattr(request.user.profile, 'active_membership', None)
        
        if active_membership:
            discount_rate = Decimal(str(active_membership.discount_percentage)) / Decimal('100')
            # Apply to products/hampers, but NOT to the membership tier itself if being purchased
            discountable_total = sum(
                item['price'] * item['quantity'] 
                for item in cart_items_data 
                if not item.get('membership_tier')
            )
            discount_amount = (discountable_total * discount_rate).quantize(Decimal('0.01'))

        # The subtotal stored in the model should be the full price before discount
        # The total will be (subtotal - discount) + delivery_fee
        net_subtotal = raw_subtotal - discount_amount
        
        # Check if any item is a gift/hamper for free delivery eligibility
        has_gift_item = any(
            item['is_hamper'] or (item['product'] and item['product'].category.name in ['Gifts', 'Hampers']) 
            for item in cart_items_data
        )
        
        delivery_fee = Decimal('0.00') if (has_gift_item or net_subtotal >= Decimal('600.00')) else Decimal('50.00')
        total = net_subtotal + delivery_fee

        # Create Order (Initially pending to ensure items are attached before activation signal)
        order = Order.objects.create(
            user=request.user,
            patron_name=data['patron_name'],
            phone=data['phone'],
            address=data['address'],
            city=data['city'],
            pincode=data['pincode'],
            special_instructions=data.get('special_instructions', ''),
            subtotal=raw_subtotal,
            discount=discount_amount,
            delivery_fee=delivery_fee,
            total=total,
            payment_method=data['payment_method'],
            payment_status='paid' if data['payment_method'] == 'cod' else 'pending',
            status='confirmed' if data['payment_method'] == 'cod' else 'placed',
        )

        # Create OrderItems (freeze product names/prices)
        is_membership_purchase = False
        for item in cart_items_data:
            if item.get('membership_tier'):
                is_membership_purchase = True
                
            OrderItem.objects.create(
                order=order,
                product=item.get('product'),
                membership_tier=item.get('membership_tier'),
                product_name=item['name'],
                product_price=item['price'],
                quantity=item['quantity'],
            )

        # AUTOMATIC LINEAGE ACTIVATION
        # If it's a membership purchase, we auto-confirm and pay to trigger the activation signal
        if is_membership_purchase:
            order.payment_status = 'paid'
            order.status = 'confirmed'
            order.save() # This triggers the signal in orders/signals.py

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    """GET /api/orders/<order_number>/ — Order detail with items."""
    permission_classes = [IsAuthenticated]

    def get(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def payment_initiate(request):
    """
    POST /api/payments/initiate/
    Mock payment initiation (Razorpay stub).
    """
    order_number = request.data.get('order_number')
    if not order_number:
        return Response({'error': 'order_number is required.'}, status=status.HTTP_400_BAD_REQUEST)

    order = get_object_or_404(Order, order_number=order_number)

    # In production, create a Razorpay order here
    mock_payment_id = f"pay_{order.order_number.replace('-', '')}"

    return Response({
        'order_number': order.order_number,
        'amount': float(order.total),
        'currency': 'INR',
        'payment_id': mock_payment_id,
        'status': 'created',
        'message': 'Payment gateway mock — use this ID to verify.',
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def payment_verify(request):
    """
    POST /api/payments/verify/
    Mock payment verification callback.
    """
    order_number = request.data.get('order_number')
    payment_id = request.data.get('payment_id')

    if not order_number or not payment_id:
        return Response({'error': 'order_number and payment_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

    order = get_object_or_404(Order, order_number=order_number)
    order.payment_status = 'paid'
    order.payment_id = payment_id
    order.status = 'confirmed'
    order.save()

    return Response({
        'message': 'Payment verified successfully!',
        'order_number': order.order_number,
        'status': order.status,
    })
