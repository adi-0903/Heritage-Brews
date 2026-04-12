import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'heritage_brews.settings')
django.setup()

from orders.models import Order
from django.db import transaction

def backfill_rewards():
    print("🏛️ Initiating Imperial Backfill of Tokens...")
    
    # Find all delivered and paid orders that haven't earned tokens yet
    eligible_orders = Order.objects.filter(
        status='delivered', 
        payment_status='paid',
        tokens_earned=0
    )
    
    if not eligible_orders.exists():
        print("✅ No missing tokens detected in the current ledger.")
        return

    print(f"🕵️ Found {eligible_orders.count()} dispatches requiring rectification.")
    
    for order in eligible_orders:
        try:
            with transaction.atomic():
                print(f"🖋️ Rectifying Order {order.order_number} (₹{order.total})...")
                # Saving will trigger the 'award_tokens_on_delivery' signal in orders/signals.py
                order.save()
            print(f"✨ Order {order.order_number} honored successfully.")
        except Exception as e:
            print(f"❌ Failed to rectify Order {order.order_number}: {e}")

    print("🏁 Imperial Backfill completed.")

if __name__ == "__main__":
    backfill_rewards()
