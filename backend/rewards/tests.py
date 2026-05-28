from django.test import TestCase
from django.contrib.auth.models import User
from decimal import Decimal
from orders.models import Order
from rewards.models import TokenTransaction
from accounts.models import UserProfile


class TokenRewardsSignalTest(TestCase):
    """
    Test suite for the token rewards signal which awards tokens on order completion and delivery.
    """

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="rewardpatron",
            email="rewardpatron@heritagebrews.com",
            password="SecurePassword123"
        )
        self.profile = self.user.profile

    def test_no_tokens_awarded_on_initial_placed_order(self):
        # Create a new placed order that is unpaid
        order = Order.objects.create(
            user=self.user,
            patron_name="Reward Patron",
            phone="9999988888",
            address="123 Haveli Lane",
            city="Jaipur",
            pincode="302001",
            subtotal=Decimal('500.00'),
            delivery_fee=Decimal('50.00'),
            discount=Decimal('0.00'),
            total=Decimal('550.00'),
            payment_method='upi',
            payment_status='pending',
            status='placed'
        )

        # Re-fetch profile
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.tea_tokens, 0)
        self.assertEqual(order.tokens_earned, 0)
        
        # Verify no token transactions are logged
        self.assertEqual(TokenTransaction.objects.filter(user=self.user).count(), 0)

    def test_tokens_awarded_on_paid_and_delivered_order(self):
        # Create an order
        order = Order.objects.create(
            user=self.user,
            patron_name="Reward Patron",
            phone="9999988888",
            address="123 Haveli Lane",
            city="Jaipur",
            pincode="302001",
            subtotal=Decimal('1200.00'),
            delivery_fee=Decimal('50.00'),
            discount=Decimal('0.00'),
            total=Decimal('1250.00'),
            payment_method='upi',
            payment_status='pending',
            status='placed'
        )

        # Update order to Paid and Delivered
        order.payment_status = 'paid'
        order.status = 'delivered'
        order.save()

        # Re-fetch order to verify tokens_earned has been set by signal
        order.refresh_from_db()
        expected_tokens = 12  # ₹1250 / 100 = 12 tokens
        self.assertEqual(order.tokens_earned, expected_tokens)

        # Re-fetch profile to verify tokens have been accrued
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.tea_tokens, expected_tokens)

        # Verify that TokenTransaction was created in database
        transactions = TokenTransaction.objects.filter(user=self.user)
        self.assertEqual(transactions.count(), 1)
        transaction = transactions.first()
        self.assertEqual(transaction.amount, expected_tokens)
        self.assertEqual(transaction.transaction_type, 'earn')
        self.assertEqual(transaction.order, order)
        self.assertIn(f"Order {order.order_number} delivered", transaction.reason)

    def test_loyalty_tier_recalculated_on_token_accrual(self):
        # Create a large order to jump tiers immediately
        order = Order.objects.create(
            user=self.user,
            patron_name="Reward Patron",
            phone="9999988888",
            address="123 Haveli Lane",
            city="Jaipur",
            pincode="302001",
            subtotal=Decimal('150000.00'),
            delivery_fee=Decimal('0.00'),
            discount=Decimal('0.00'),
            total=Decimal('150000.00'),
            payment_method='upi',
            payment_status='paid',
            status='placed'
        )

        # Initial tier is naya_patron
        self.assertEqual(self.profile.loyalty_tier, 'naya_patron')

        # Deliver order to trigger token reward signal
        order.status = 'delivered'
        order.save()

        # Re-fetch profile
        self.profile.refresh_from_db()
        expected_tokens = 1500  # ₹150000 / 100 = 1500 tokens
        self.assertEqual(self.profile.tea_tokens, expected_tokens)
        
        # Verify user has jumped to 'brass_baron' tier (>= 1000 tokens)
        self.assertEqual(self.profile.loyalty_tier, 'brass_baron')

    def test_token_accrual_idempotency(self):
        # Create and deliver a paid order
        order = Order.objects.create(
            user=self.user,
            patron_name="Reward Patron",
            phone="9999988888",
            address="123 Haveli Lane",
            city="Jaipur",
            pincode="302001",
            subtotal=Decimal('800.00'),
            delivery_fee=Decimal('50.00'),
            discount=Decimal('0.00'),
            total=Decimal('850.00'),
            payment_method='upi',
            payment_status='paid',
            status='delivered'
        )

        # Verify tokens are awarded
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.tea_tokens, 8)
        self.assertEqual(TokenTransaction.objects.filter(user=self.user).count(), 1)

        # Trigger save on the order again (no status/payment changes)
        order.save()

        # Verify no additional tokens are awarded (idempotency check)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.tea_tokens, 8)
        self.assertEqual(TokenTransaction.objects.filter(user=self.user).count(), 1)

    def test_no_tokens_awarded_for_low_value_order(self):
        # Create an order with total < ₹100
        order = Order.objects.create(
            user=self.user,
            patron_name="Reward Patron",
            phone="9999988888",
            address="123 Haveli Lane",
            city="Jaipur",
            pincode="302001",
            subtotal=Decimal('80.00'),
            delivery_fee=Decimal('10.00'),
            discount=Decimal('0.00'),
            total=Decimal('90.00'),
            payment_method='upi',
            payment_status='paid',
            status='delivered'
        )

        # Re-fetch profile and order
        order.refresh_from_db()
        self.profile.refresh_from_db()
        
        self.assertEqual(order.tokens_earned, 0)
        self.assertEqual(self.profile.tea_tokens, 0)
        self.assertEqual(TokenTransaction.objects.filter(user=self.user).count(), 0)

    def test_no_tokens_awarded_if_delivered_but_unpaid(self):
        # Create an order that is delivered but pending payment
        order = Order.objects.create(
            user=self.user,
            patron_name="Reward Patron",
            phone="9999988888",
            address="123 Haveli Lane",
            city="Jaipur",
            pincode="302001",
            subtotal=Decimal('1000.00'),
            delivery_fee=Decimal('50.00'),
            discount=Decimal('0.00'),
            total=Decimal('1050.00'),
            payment_method='upi',
            payment_status='pending',
            status='delivered'
        )

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.tea_tokens, 0)
        self.assertEqual(TokenTransaction.objects.filter(user=self.user).count(), 0)
