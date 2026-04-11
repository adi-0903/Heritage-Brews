from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=8, decimal_places=2, read_only=True)
    product_image = serializers.SerializerMethodField()
    line_total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'product_price', 'product_image', 'quantity', 'line_total']

    def get_product_image(self, obj):
        return obj.product.display_image


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.IntegerField(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_items', 'subtotal', 'updated_at']


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=0)


class OrderItemSerializer(serializers.ModelSerializer):
    line_total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'product_price', 'quantity', 'line_total']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'patron_name', 'phone', 'address', 'city',
            'pincode', 'special_instructions', 'subtotal', 'delivery_fee',
            'discount', 'total', 'payment_method', 'payment_status', 'status',
            'tokens_earned', 'tokens_redeemed', 'items', 'created_at', 'updated_at',
        ]
        read_only_fields = [
            'order_number', 'subtotal', 'delivery_fee', 'total',
            'payment_status', 'status', 'tokens_earned', 'created_at', 'updated_at',
        ]


class PlaceOrderSerializer(serializers.Serializer):
    """Validates checkout form data."""
    patron_name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=15)
    address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    pincode = serializers.CharField(max_length=10)
    special_instructions = serializers.CharField(required=False, default='', allow_blank=True)
    payment_method = serializers.ChoiceField(choices=['upi', 'card', 'bank', 'netbanking', 'cod'])
    items = serializers.ListField(child=serializers.DictField(), required=False)
