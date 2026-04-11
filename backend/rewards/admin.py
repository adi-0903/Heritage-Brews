from django.contrib import admin
from .models import RewardTier, TokenTransaction


@admin.register(RewardTier)
class RewardTierAdmin(admin.ModelAdmin):
    list_display = ['name', 'min_tokens', 'max_tokens', 'color', 'icon']
    list_editable = ['color']


@admin.register(TokenTransaction)
class TokenTransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'transaction_type', 'reason', 'created_at']
    list_filter = ['transaction_type', 'created_at']
    search_fields = ['user__username', 'reason']
    date_hierarchy = 'created_at'
