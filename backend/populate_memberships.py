import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'heritage_brews.settings')
django.setup()

from memberships.models import MembershipTier

def populate():
    tiers = [
        {
            "title": "Novice Sommelier",
            "slug": "novice",
            "price": 3999.00,
            "billing_cycle": "Per Annum",
            "heritage_level": 1,
            "features": [
                "Standard Archive Gallery Access",
                "Basic Weather Telemetry",
                "Seasonal Newsletters",
                "Community Forum Access"
            ],
            "discount_percentage": 10.00,
            "feature_keys": ["archive_basic", "weather_basic", "newsletters"]
        },
        {
            "title": "Grandmaster Legacy",
            "slug": "grandmaster",
            "price": 6999.00,
            "billing_cycle": "Per Annum",
            "heritage_level": 2,
            "features": [
                "Unlimited Acquisition Vault Access",
                "High-Fidelity Macro Imagery",
                "Lunar Plucking Priority",
                "Real-time Weather Syncing",
                "Personal Sommelier Consultations"
            ],
            "discount_percentage": 20.00,
            "feature_keys": ["vault_access", "macro_imagery", "plucking_priority", "weather_live", "sommelier_consult"]
        },
        {
            "title": "Estate Sovereign",
            "slug": "sovereign",
            "price": 13599.00,
            "billing_cycle": "Per Annum",
            "heritage_level": 3,
            "features": [
                "Direct Estate Lineage Access",
                "Early Harvest Allocation",
                "Exclusive Archive Hallmarking",
                "VIP Private Estates Visiting",
                "Ultra-Rare Batch Preservation"
            ],
            "discount_percentage": 30.00,
            "feature_keys": ["estate_lineage", "early_harvest", "hallmarking", "private_visiting", "batch_preservation", "weather_live", "vault_access"]
        }
    ]

    for tier_data in tiers:
        tier, created = MembershipTier.objects.update_or_create(
            slug=tier_data['slug'],
            defaults=tier_data
        )
        if created:
            print(f"Created lineage tier: {tier.title}")
        else:
            print(f"Updated lineage tier: {tier.title}")

if __name__ == '__main__':
    print("Initiating Memberships Data Infrastructure...")
    populate()
    print("Memberships Data Successfully Population.")
