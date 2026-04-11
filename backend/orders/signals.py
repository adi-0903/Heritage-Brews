from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order


@receiver(post_save, sender=Order)
def award_tokens_on_delivery(sender, instance, **kwargs):
    """
    Award tea tokens when an order is delivered.
    Rule: 1 token per ₹10 spent.
    """
    if instance.status == 'delivered' and instance.payment_status == 'paid':
        tokens = int(instance.total / 10)
        if tokens > 0 and instance.tokens_earned == 0:
            instance.tokens_earned = tokens
            Order.objects.filter(pk=instance.pk).update(tokens_earned=tokens)

            # Credit to user profile
            if instance.user and hasattr(instance.user, 'profile'):
                profile = instance.user.profile
                profile.tea_tokens += tokens
                profile.save(update_fields=['tea_tokens'])
                profile.recalculate_tier()

                # Log the transaction
                from rewards.models import TokenTransaction
                TokenTransaction.objects.create(
                    user=instance.user,
                    amount=tokens,
                    reason=f"Order {instance.order_number} delivered",
                    order=instance,
                )
