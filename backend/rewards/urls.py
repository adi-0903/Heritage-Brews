from django.urls import path
from . import views

urlpatterns = [
    path('tiers/', views.RewardTierListView.as_view(), name='reward-tiers'),
    path('dashboard/', views.rewards_dashboard, name='rewards-dashboard'),
    path('history/', views.TokenTransactionListView.as_view(), name='rewards-history'),
    path('redeem/', views.redeem_tokens, name='rewards-redeem'),
]
