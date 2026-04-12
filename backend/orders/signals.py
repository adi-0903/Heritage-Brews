from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order


@receiver(post_save, sender=Order)
def award_tokens_on_delivery(sender, instance, **kwargs):
    """
    Award tea tokens when an order is delivered.
    Rule: 1 token per ₹100 spent.
    """
    if instance.status == 'delivered' and instance.payment_status == 'paid':
        # Only award if not already awarded
        if instance.tokens_earned == 0:
            tokens = int(instance.total / 100)
            if tokens > 0:
                # Atomically update order to prevent race conditions if possible
                Order.objects.filter(pk=instance.pk, tokens_earned=0).update(tokens_earned=tokens)
                
                # Re-fetch instance to ensure we have the updated tokens_earned in memory
                instance.refresh_from_db()

                # Credit to user profile
                if instance.user:
                    from accounts.models import UserProfile
                    profile, created = UserProfile.objects.get_or_create(user=instance.user)
                    
                    profile.tea_tokens += tokens
                    profile.save(update_fields=['tea_tokens'])
                    
                    if hasattr(profile, 'recalculate_tier'):
                        profile.recalculate_tier()

                    # Log the transaction
                    from rewards.models import TokenTransaction
                    if not TokenTransaction.objects.filter(order=instance, transaction_type='earn').exists():
                        TokenTransaction.objects.create(
                            user=instance.user,
                            amount=tokens,
                            reason=f"Order {instance.order_number} delivered",
                            order=instance,
                        )


@receiver(post_save, sender=Order)
def activate_membership_on_payment(sender, instance, **kwargs):
    """
    Automatically activate membership when payment is confirmed.
    """
    if instance.payment_status == 'paid' and instance.user:
        # Check if any item in the order is a membership
        membership_items = instance.items.filter(membership_tier__isnull=False)
        
        if membership_items.exists():
            # Get the highest level membership from the order
            highest_membership = membership_items.order_by('-membership_tier__heritage_level').first().membership_tier
            
            # Update user profile
            if hasattr(instance.user, 'profile'):
                profile = instance.user.profile
                profile.active_membership = highest_membership
                profile.save(update_fields=['active_membership'])
                
                # In production, you might also want to set an expiry date
                # profile.membership_expiry = ...
                # profile.save()
