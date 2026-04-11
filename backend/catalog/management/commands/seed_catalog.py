from django.core.management.base import BaseCommand
from catalog.models import Category, Product, SubscriptionPlan, GiftHamper
from rewards.models import RewardTier

class Command(BaseCommand):
    help = 'Seeds the database with a complete, prestigious Heritage Brews catalog.'

    def handle(self, *args, **options):
        self.stdout.write('Summoning the Royal Archive: Inscribing the Ledger...')

        # 1. Categories
        teas_cat, _ = Category.objects.get_or_create(
            name='Heritage Teas',
            defaults={'description': 'Rare flushes and ancient blends.', 'icon': 'tea', 'display_order': 1}
        )
        coffees_cat, _ = Category.objects.get_or_create(
            name='Coffee Roasts',
            defaults={'description': 'Shade-grown, slow-roasted beans.', 'icon': 'coffee', 'display_order': 2}
        )
        snacks_cat, _ = Category.objects.get_or_create(
            name='Savory Snacks',
            defaults={'description': 'Traditional nibbles and tea-time crunch.', 'icon': 'restaurant', 'display_order': 3}
        )
        sweets_cat, _ = Category.objects.get_or_create(
            name='Royal Sweets',
            defaults={'description': 'Decadent delights from the haveli kitchens.', 'icon': 'cake', 'display_order': 4}
        )

        # 2. Teas
        tea_data = [
            ('Zaffrani Reserve Chai', 250, 'Hand-rolled CTC infused with Kashmiri saffron and royal spices.', 'Assam & Kashmir', ['signature', 'bestseller'], '/images/zaffrani_chai_1775834455709.png'),
            ('Maharaja Darjeeling Flush', 400, 'The Champagne of Teas. First flush from Makaibari.', 'Darjeeling', ['limited'], '/images/darjeeling_tea_1775770278908.png'),
            ('Nilgiri Blue Mountain', 500, 'Crisp, bright, and floral notes from the high altitudes.', 'Nilgiri Hills', [], '/images/loose_tea_leaves.png'),
            ('Paan Banaras Tea', 350, 'A nostalgic blend with essence of betel leaf and menthol.', 'Banaras', ['unique'], '/images/elaichi_chai_1775770295145.png'),
        ]
        for name, price, desc, origin, tags, img in tea_data:
            Product.objects.update_or_create(name=name, defaults={'category': teas_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 3. Coffees
        coffee_data = [
            ('Coorg Gold Peaberry', 800, 'Rare beans with notes of cocoa and forest honey.', 'Coorg', ['featured'], '/images/filter_kaapi_1775834471070.png'),
            ('Malabar Monsooned Dark', 550, 'Earthy, chocolatey depth exposed to monsoon winds.', 'Malabar Coast', [], '/images/monsoon_coffee_1775770310752.png'),
            ('Mysore Nuggets Extra Bold', 650, 'The highest grade of Indian Washed Arabica.', 'Mysore', ['premium'], '/images/loose_tea_leaves.png'),
        ]
        for name, price, desc, origin, tags, img in coffee_data:
            Product.objects.update_or_create(name=name, defaults={'category': coffees_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 4. Snacks (Namkeen & Savories)
        snack_data = [
            ('Bikaneri Raj Shahi Bhujia', 450, 'Extra-crispy moth bean flour snack with royal spices.', 'Bikaner', ['crunchy'], '/images/bikaneri_bhujia_1775836112319.png'),
            ('Mini Samosa Archive', 650, 'Bite-sized triangles filled with spiced lentils and nostalgia.', 'Old Delhi', ['popular'], '/images/shahi_samosa_1775770348240.png'),
            ('Pista Lauj Namkeen', 800, 'Premium pistachios roasted in pure ghee and Himalayan salt.', 'Heritage Kitchen', ['signature'], '/images/mathri_snack_1775770332290.png'),
        ]
        for name, price, desc, origin, tags, img in snack_data:
            Product.objects.update_or_create(name=name, defaults={'category': snacks_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 5. Sweets (Mithai)
        sweet_data = [
            ('Awadhi Gulab Jamun (12pc)', 950, 'Soft, melt-in-mouth berries soaked in saffron syrup.', 'Lucknow', ['classic'], '/images/awadhi_gulab_jamun_1775834487935.png'),
            ('Kesar Peda Box', 850, 'Hand-pressed milk fudge infused with threads of saffron.', 'Mathura', ['pure'], '/images/kesar_peda_1775836152392.png'),
            ('Silver Leaf Kaju Katli', 1200, 'Finest cashew fudge adorned with pure silver leaf.', 'Heritage Recipe', [], '/images/mysore_pak_1775836173822.png'),
        ]
        for name, price, desc, origin, tags, img in sweet_data:
            Product.objects.update_or_create(name=name, defaults={'category': sweets_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 6. Hampers (Curations)
        hamper_data = [
            ('Shahi Diwali Hamper', 7500, 'A majestic collection of tea, sweets, and handcrafted brassware.', 'diwali', ['Festive'], '/images/shahi_diwali_ai.png'),
            ('Corporate Wellness Kit', 4500, 'Curated selections for professional serenity.', 'corporate', ['Classic'], '/images/corp_wellness_ai.png'),
            ('The Royal Anniversary Trunk', 12000, 'The ultimate gift—luxury blends and archival treasures.', 'anniversary', ['Ultra-Premium'], '/images/royal_anniversary_ai.png'),
            ('Sommelier’s Tasting Box', 5500, 'A rare selection of loose-leaf flushes paired with a glass infuser.', 'general', ['New Arrival'], '/images/sommeliers_tasting_ai.png'),
        ]
        for name, price, desc, occasion, badge, img in hamper_data:
            GiftHamper.objects.update_or_create(name=name, defaults={'price': price, 'description': desc, 'occasion': occasion, 'badge_text': badge, 'image_url': img})

        # 7. Subscription Plans (Sommelier)
        sub_data = [
            ('Heritage Silver', 'A monthly journey through the classics.', 3000, ['2x 100g Seasonal Teas', 'Early access', '10% off hampers'], 'military_tech', ''),
            ('Shahi Brass', 'The ultimate archival experience.', 6000, ['3x Rare Estate Reserves', 'Sommelier consultation', 'Brass canister set'], 'workspace_premium', 'Royal Circle'),
        ]
        for name, tagline, price, features, icon, badge in sub_data:
            SubscriptionPlan.objects.update_or_create(name=name, defaults={'tagline': tagline, 'price_monthly': price, 'features': features, 'icon': icon, 'badge_text': badge})

        # 8. Loyalty Tiers (The Four Ascensions)
        tier_data = [
            ('Naya Patron', 'naya_patron', 0, 999, 'filter_vintage', '#cd7f32', 'Your first step into the heritage archive. Welcome to the family.', ['Entry Access', 'Digital Journal']),
            ('Brass Baron', 'brass_baron', 1000, 4999, 'workspace_premium', '#B87333', 'A distinguished connoisseur of artisanal blends.', ['10% Discount on Blends', 'Birthday Tokens']),
            ('Heritage Keeper', 'heritage_keeper', 5000, 14999, 'castle', '#C0C0C0', 'Guardian of the archival flushes and rare artifacts.', ['Early Access to Estates', 'Free Shipping Always']),
            ('Maharaja', 'maharaja', 15000, None, 'diamond', '#F4C430', 'The ultimate peak of connoisseurship. Royalty in every cup.', ['Private Sommelier Service', 'Unlimited Archival Treaures']),
        ]
        for name, slug, min_t, max_t, icon, color, desc, perks in tier_data:
            RewardTier.objects.update_or_create(slug=slug, defaults={
                'name': name, 'min_tokens': min_t, 'max_tokens': max_t, 
                'icon': icon, 'color': color, 'description': desc, 'perks': perks
            })

        self.stdout.write(self.style.SUCCESS('The Royal Menu, Curations vault, Sommelier Tiers, and Loyalty Ascensions are now fully restored.'))
