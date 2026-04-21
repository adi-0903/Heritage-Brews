from django.core.management.base import BaseCommand
from catalog.models import Category, Product, SommelierCuration, GiftHamper
from rewards.models import RewardTier

class Command(BaseCommand):
    help = 'Seeds the database with a complete, prestigious Heritage Brews catalog.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Summoning the Royal Archive: Inscribing the Ledger...'))

        # 1. Clear existing data to ensure a fresh, synchronized state
        Product.objects.all().delete()
        Category.objects.all().delete()
        SommelierCuration.objects.all().delete()
        GiftHamper.objects.all().delete()

        # 1a. Establish Categories with specific display orders
        teas_cat, _ = Category.objects.get_or_create(
            name='Heritage Teas',
            defaults={'description': 'Hand-picked rare blends from ancestral gardens.', 'icon': 'eco', 'display_order': 1}
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
        vault_cat, _ = Category.objects.get_or_create(
            name='The Estate Vault',
            defaults={'description': 'Rare and limited harvests reserved for the elite.', 'icon': 'lock', 'display_order': 5}
        )

        # 2. Teas (Public Menu - Blends and Regional Specialties)
        tea_data = [
            ('Zaffrani Reserve Chai', 250, 'Hand-rolled CTC infused with Kashmiri saffron and royal spices.', 'Regional Blend', ['signature', 'bestseller'], '/images/zaffrani_chai_1775834455709.png'),
            ('Kashmiri Kahwa Royal', 380, 'Green tea infused with saffron, cardamom, and crushed almonds.', 'Kashmir Valley', ['classic'], '/images/zaffrani_chai_1775834455709.png'),
            ('Grandmaster Masala Blend', 280, 'A potent mix of CTC tea with cinnamon, cloves, and black pepper.', 'Heritage Recipe', [], '/images/elaichi_chai_1775770295145.png'),
            ('Paan Banaras Tea', 350, 'A nostalgic blend with essence of betel leaf and menthol.', 'Banaras', ['unique'], '/images/elaichi_chai_1775770295145.png'),
        ]
        for name, price, desc, origin, tags, img in tea_data:
            Product.objects.update_or_create(name=name, defaults={'category': teas_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 2b. Vault Products from Estates Page (Premium & High-Altitude Single Estates)
        # EXACTLY 6 ITEMS AS PER IMAGE 2
        vault_data = [
            ('Makaibari "First Light"', 4500, 'Exceptionally light cup. Hints of damp pine and wild honey.', 'Darjeeling', ['vault', 'premium'], '/images/makaibari_first_flush_macro_1775918544000_1775918704957.png'),
            ('Moonlight Imperial', 8500, 'Cool, crystalline body. Notes of jasmine and night blooming cereus.', 'Darjeeling', ['vault', 'premium'], '/images/moonlight_imperial_white_macro_1775919340083.png'),
            ('Brahmaputra Gold', 3200, 'Thick, jammy body with dark chocolate and malt finish.', 'Assam', ['vault', 'premium'], '/images/dibrugarh_golden_tips_macro_1775918544002_1775918734056.png'),
            ('Ancestral Smoke', 5200, 'Smoky, leathery notes with an undertone of sweet molasses and cedar.', 'Assam', ['vault', 'premium'], '/images/ancestral_smoke_assam_macro_1775919355456.png'),
            ('Blue Mountain Frost', 3800, 'Floral citrus with a creamy mouthfeel. Bracingly crisp.', 'Nilgiri', ['vault', 'premium'], '/images/coonoor_frost_tea_macro_1775918544004_1775918760868.png'),
            ('Emerald Frost', 4100, 'Grass-fresh, with notes of cucumber and sweet mountain water.', 'Nilgiri', ['vault', 'premium'], '/images/emerald_frost_nilgiri_macro_1775919373586.png'),
        ]
        for name, price, desc, origin, tags, img in vault_data:
            Product.objects.update_or_create(name=name, defaults={'category': vault_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})


        # 3. Coffees
        coffee_data = [
            ('Coorg Gold Peaberry', 800, 'Rare beans with notes of cocoa and forest honey.', 'Coorg', ['featured'], '/images/filter_kaapi_1775834471070.png'),
            ('Malabar Monsooned Dark', 550, 'Earthy, chocolatey depth exposed to monsoon winds.', 'Malabar Coast', [], '/images/monsoon_coffee_1775770310752.png'),
            ('Araku Valley Signature', 720, 'Premium organic Arabica with notes of dark chocolate and citrus.', 'Eastern Ghats', ['organic'], '/images/monsoon_coffee_1775770310752.png'),
        ]
        for name, price, desc, origin, tags, img in coffee_data:
            Product.objects.update_or_create(name=name, defaults={'category': coffees_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 4. Snacks (Namkeen & Savories)
        snack_data = [
            ('Bikaneri Raj Shahi Bhujia', 450, 'Extra-crispy moth bean flour snack with royal spices.', 'Bikaner', ['crunchy'], '/images/bikaneri_bhujia_1775836112319.png'),
            ('Mysore Nuggets (Shahi Savory)', 350, 'Crunchy, spiced lentil nuggets from the royal city of Mysore.', 'Mysore', ['unique'], '/images/shahi_samosa_1775770348240.png'),
            ('Mini Samosa Archive', 650, 'Bite-sized triangles filled with spiced lentils and nostalgia.', 'Old Delhi', ['popular'], '/images/shahi_samosa_1775770348240.png'),
            ('Mathri of the Marwars', 299, 'Fenugreek-infused flaky crackers, a standard for every merchant caravan.', 'Marwar', ['classic'], '/images/mathri_snack.png'),
            ('Kachori of the Kachwahas', 349, 'Spiced lentil-filled crisp pastry, once a staple of the Jaipur court.', 'Jaipur', [], '/images/kachori_kachwahas.png'),
            ('Saffron-Salted Cashews', 499, 'Hand-selected jumbo kernels roasted with premium Kashmiri Saffron.', 'Kashmir', ['premium'], '/images/saffron_cashews.png'),
            ('Rajputana Mathania Peanuts', 249, 'Slow-roasted with sun-dried Rajasthani Mathania chilies for a deep heat.', 'Mathania', [], '/images/mathania_peanuts.png'),
        ]
        for name, price, desc, origin, tags, img in snack_data:
            Product.objects.update_or_create(name=name, defaults={'category': snacks_cat, 'price': price, 'description': desc, 'origin': origin, 'tags': tags, 'image_url': img})

        # 5. Sweets (Mithai)
        sweet_data = [
            ('Awadhi Gulab Jamun (Royal 12PC)', 950, 'Aromatic spheres soaked in damask rose syrup with a pistachio heart. Served in a royal clay pot.', 'Lucknow', ['premium', 'signature'], '/images/awadhi_gulab_jamun.png'),
            ('Shahi Tukda (Silver Signature)', 449, 'Saffron-soaked bread pudding finished with edible silver leaf.', 'Hyderabad', ['signature'], '/images/shahi_tukda.png'),
            ('Mysore Pak (Ghee-Rich Reserve)', 399, 'Legendary chickpea fudge prepared with 24-month aged clarified butter.', 'Mysore', ['legacy'], '/images/mysore_pak.png'),
            ('Banarasi Paan-Infused Malai', 549, 'Creamy delicacy captured with the cooling essence of fresh betel leaf.', 'Banaras', ['unique'], '/images/banarasi_paan_malai.png'),
            ('Saffron Kesar Peda', 349, 'Silky fudge with the essence of pure Saffron, stamped with the Royal Seal.', 'Mathura', [], '/images/kesar_peda.png'),
            ('Silver Leaf Kaju Katli', 499, 'Diamond-shaped cashew fudge glistening with a layer of pure edible silver.', 'Heritage Recipe', [], '/images/kaju_katli.png'),
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

        # 7. Sommelier Curations (One-time boxes)
        sub_data = [
            ('Heritage Silver', 'The Masterclass Box', 4999, ["2x 250g Rare Estate Blend", "2x Traditional Handcrafted Cups", "Handcrafted Brass Measuring Spoon", "Sommelier's Archival Journal", "Masterclass Tasting Guide", "Traditional Royal Gift Box"], 'military_tech', 'The Masterclass'),
            ('Shahi Brass', 'The Ultimate Heritage Kit', 7999, ["4x 500g Rare Estate Reserves", "4x Traditional Handcrafted Cups", "Authentic Handcrafted Brass Canister", "Complete Heritage Cupping Kit", "Grand Sommelier's Hardbound Journal", "Sommelier Virtual Consultation", "Exquisite Royal Velvet-Lined Packaging"], 'workspace_premium', 'Royal Circle'),
        ]
        for name, tagline, price, features, icon, badge in sub_data:
             SommelierCuration.objects.update_or_create(name=name, defaults={
                'tagline': tagline, 'price': price, 'features': features, 
                'icon': icon, 'badge_text': badge
            })

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
