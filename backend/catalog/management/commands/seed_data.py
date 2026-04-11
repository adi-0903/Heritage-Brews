"""
Heritage Brews — Database Seed Command
Populates the database with all data currently hardcoded in the frontend.

Usage: python manage.py seed_data
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from catalog.models import Category, Product, SubscriptionPlan, GiftHamper
from blends.models import SpiceOption
from rewards.models import RewardTier
from content.models import BlogPost, Estate, Farmer


class Command(BaseCommand):
    help = 'Seeds the database with Heritage Brews product data from the frontend'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('🌱 Seeding Heritage Brews database...'))

        self._seed_categories()
        self._seed_products()
        self._seed_subscriptions()
        self._seed_gift_hampers()
        self._seed_spice_options()
        self._seed_reward_tiers()
        self._seed_estates_and_farmers()
        self._seed_blog_posts()
        self._create_superuser()

        self.stdout.write(self.style.SUCCESS('✅ Database seeded successfully!'))

    def _seed_categories(self):
        categories = [
            {'name': 'Heritage Teas', 'slug': 'heritage-teas', 'icon': 'eco', 'display_order': 1, 'description': 'Time-honored blends from the royal kitchens of India.'},
            {'name': 'Shade-Grown Coffees', 'slug': 'shade-grown-coffees', 'icon': 'local_cafe', 'display_order': 2, 'description': 'Single-origin beans from the Western Ghats.'},
            {'name': 'Namkeen & Snacks', 'slug': 'namkeen-snacks', 'icon': 'restaurant', 'display_order': 3, 'description': 'Traditional Indian savouries for your chai time.'},
            {'name': 'Mithai & Sweets', 'slug': 'mithai-sweets', 'icon': 'cake', 'display_order': 4, 'description': 'Artisanal Indian confections and desserts.'},
        ]
        for cat_data in categories:
            Category.objects.get_or_create(slug=cat_data['slug'], defaults=cat_data)
        self.stdout.write(f'  ✓ {len(categories)} categories created')

    def _seed_products(self):
        tea_cat = Category.objects.get(slug='heritage-teas')
        coffee_cat = Category.objects.get(slug='shade-grown-coffees')
        snacks_cat = Category.objects.get(slug='namkeen-snacks')
        sweets_cat = Category.objects.get(slug='mithai-sweets')

        products = [
            # Heritage Teas
            {'category': tea_cat, 'name': 'Zaffrani Masala Chai', 'slug': 'zaffrani-masala-chai', 'description': 'Assam CTC blend infused with cardamom, clove, cinnamon, and Kashmiri saffron strands. A regal cup straight from a Nawabi kitchen.', 'price': 245, 'origin': 'Assam', 'is_featured': True, 'tags': ['bestseller'], 'image_url': '/images/zaffrani_chai_1775834455709.png'},
            {'category': tea_cat, 'name': 'Darjeeling First Flush', 'slug': 'darjeeling-first-flush', 'description': 'The champagne of teas. Light muscatel notes with a floral bouquet, handpicked during the spring harvest from heritage gardens.', 'price': 495, 'origin': 'Darjeeling', 'is_featured': True, 'tags': ['premium'], 'image_url': '/images/darjeeling_tea_1775770278908.png'},
            {'category': tea_cat, 'name': 'Elaichi Adrak Chai', 'slug': 'elaichi-adrak-chai', 'description': 'A warming blend of sun-dried ginger from Kerala and green cardamom pods from the Western Ghats. Perfect for rainy evenings.', 'price': 195, 'origin': 'Kerala', 'is_featured': True, 'tags': ['popular'], 'image_url': '/images/elaichi_chai_1775770295145.png'},

            # Coffees
            {'category': coffee_cat, 'name': 'Monsoon Malabar AA', 'slug': 'monsoon-malabar-aa', 'description': 'Full-bodied, low-acidity beans monsoon-aged in open warehouses on the Malabar coast. Chocolatey with earthy undertones.', 'price': 375, 'origin': 'Coorg', 'is_featured': True, 'tags': ['single-origin'], 'image_url': '/images/monsoon_coffee_1775770310752.png'},
            {'category': coffee_cat, 'name': 'South Indian Filter Kaapi', 'slug': 'south-indian-filter-kaapi', 'description': 'Traditional 80:20 coffee-chicory blend, stone-ground for brass drip filter preparation. The taste of every Udupi restaurant.', 'price': 225, 'origin': 'Chikmagalur', 'is_featured': False, 'tags': ['classic'], 'image_url': '/images/filter_kaapi_1775834471070.png'},

            # Snacks
            {'category': snacks_cat, 'name': 'Shahi Samosa (Box of 6)', 'slug': 'shahi-samosa-box', 'description': 'Golden, flaky pastry filled with spiced potatoes, peas, and a hint of pomegranate seeds. Served with tamarind chutney.', 'price': 180, 'origin': 'Jaipur', 'is_featured': False, 'tags': [], 'image_url': '/images/shahi_samosa_1775770348240.png'},
            {'category': snacks_cat, 'name': 'Rajasthani Mathri', 'slug': 'rajasthani-mathri', 'description': 'Crispy, flaky crackers seasoned with ajwain and black pepper. A generations-old recipe from the kitchens of Jodhpur.', 'price': 120, 'origin': 'Jodhpur', 'is_featured': False, 'tags': [], 'image_url': '/images/mathri_snack_1775770332290.png'},
            {'category': snacks_cat, 'name': 'Bikaneri Bhujia', 'slug': 'bikaneri-bhujia', 'description': 'Crispy, spicy chickpea flour noodles infused with moth bean flour and a secret blend of Bikaner spices. Perfect crunch for your evening chai.', 'price': 150, 'origin': 'Bikaner', 'is_featured': True, 'tags': ['spicy'], 'image_url': '/images/bikaneri_bhujia_1775836112319.png'},
            {'category': snacks_cat, 'name': 'Moong Dal Kachori', 'slug': 'moong-dal-kachori', 'description': 'Crisp, golden pastries stuffed with a fiery, heavily spiced yellow lentil mixture. A legendary street food classic.', 'price': 190, 'origin': 'Jaipur', 'is_featured': True, 'tags': ['street-food'], 'image_url': '/images/moong_dal_kachori_1775836133797.png'},

            # Sweets
            {'category': sweets_cat, 'name': 'Awadhi Gulab Jamun', 'slug': 'awadhi-gulab-jamun', 'description': 'Milk-solid dumplings slow-cooked in rose and cardamom sugar syrup. Made fresh daily using the Lucknowi khoya technique.', 'price': 199, 'origin': 'Lucknow', 'is_featured': True, 'tags': ['handmade'], 'image_url': '/images/awadhi_gulab_jamun_1775834487935.png'},
            {'category': sweets_cat, 'name': 'Kesar Peda', 'slug': 'kesar-peda', 'description': 'Rich, fudge-like milk sweet infused with pure saffron and topped with pistachios. Melting-in-mouth goodness from Mathura.', 'price': 280, 'origin': 'Mathura', 'is_featured': False, 'tags': ['bestseller'], 'image_url': '/images/kesar_peda_1775836152392.png'},
            {'category': sweets_cat, 'name': 'Mysore Pak', 'slug': 'mysore-pak', 'description': 'A regal South Indian delicacy made from generous amounts of pure ghee, gram flour, and sugar, boasting a porous, honeycomb texture.', 'price': 350, 'origin': 'Mysore', 'is_featured': True, 'tags': ['ghee', 'premium'], 'image_url': '/images/mysore_pak_1775836173822.png'},
        ]

        for prod_data in products:
            Product.objects.update_or_create(slug=prod_data['slug'], defaults=prod_data)
        self.stdout.write(f'  ✓ {len(products)} products created')

    def _seed_subscriptions(self):
        plans = [
            {
                'name': 'Silver Tier',
                'slug': 'silver-tier',
                'tagline': 'The Seasonal Companion',
                'price_monthly': 1850,
                'icon': 'workspace_premium',
                'is_premium': False,
                'features': [
                    '2x 100g Seasonal Teas',
                    'Tasting Notes Card',
                    'Free Shipping',
                    'Monthly Newsletter',
                ],
            },
            {
                'name': 'Shahi Brass Tier',
                'slug': 'shahi-brass-tier',
                'tagline': 'The Connoisseur\'s Archive',
                'price_monthly': 4200,
                'icon': 'stars',
                'is_premium': True,
                'badge_text': 'Most Popular',
                'features': [
                    '4x 100g Premium Single-Origin Teas',
                    '1x 200g Exclusive Reserve Blend',
                    'Hand-Etched Brass Canister (Quarterly)',
                    'Priority Access to Limited Editions',
                    'Dedicated Sommelier WhatsApp',
                    'Complimentary Haveli Reservation',
                ],
            },
        ]
        for plan_data in plans:
            SubscriptionPlan.objects.get_or_create(slug=plan_data['slug'], defaults=plan_data)
        self.stdout.write(f'  ✓ {len(plans)} subscription plans created')

    def _seed_gift_hampers(self):
        hampers = [
            {'name': 'Diwali Shahi Hamper', 'slug': 'diwali-shahi-hamper', 'description': 'A royal box of festive warmth — premium teas, brass kulhad set, artisan nankhatai, and Kashmiri kesar.', 'price': 2499, 'occasion': 'diwali', 'is_limited': True, 'badge_text': 'Limited Edition', 'image_url': '/images/diwali_shahi_hamper_1775834505548.png', 'contents': ['Zaffrani Chai 200g', 'Brass Kulhad Set', 'Nankhatai Tin', 'Kashmiri Kesar 1g']},
            {'name': 'Anniversary Heritage Box', 'slug': 'anniversary-heritage-box', 'description': 'Celebrate with rare single-origin teas paired with handcrafted ceramic cups and a personal tasting journal.', 'price': 3499, 'occasion': 'anniversary', 'is_limited': False, 'badge_text': 'Bestseller', 'image_url': '/images/brass_tea_canister.png', 'contents': ['Darjeeling First Flush 150g', 'Ceramic Cup Pair', 'Tasting Journal', 'Silk Gift Wrap']},
            {'name': 'Corporate Wellness Kit', 'slug': 'corporate-wellness-kit', 'description': 'Elevate your office culture with curated wellness teas, energy blends, and branded heritage mugs.', 'price': 1999, 'occasion': 'corporate', 'is_limited': False, 'badge_text': '', 'image_url': '/images/corporate_wellness_kit_1775834518652.png', 'contents': ['Tulsi Green Tea 100g', 'Masala Chai Box', 'Heritage Mug', 'Branded Sleeve']},
            {'name': 'Mithai & Chai Pairing Box', 'slug': 'mithai-chai-pairing-box', 'description': 'The perfect Indian gift: fresh sweets from Jodhpur paired with aromatic chai blends for the ultimate tasting experience.', 'price': 4999, 'occasion': 'general', 'is_limited': True, 'badge_text': 'Premium', 'image_url': '/images/mithai_pairing_box_1775834533009.png', 'contents': ['Gulab Jamun Box', 'Kesar Peda', 'Elaichi Adrak Chai 200g', 'Silver Spoon Set']},
        ]
        for hamper_data in hampers:
            GiftHamper.objects.update_or_create(slug=hamper_data['slug'], defaults=hamper_data)
        self.stdout.write(f'  ✓ {len(hampers)} gift hampers created')

    def _seed_spice_options(self):
        spices = [
            {'name_en': 'Elaichi', 'name_hi': 'इलायची', 'description': 'Green Cardamom • Sweet & Floral', 'icon': 'local_florist', 'default_intensity': 30, 'display_order': 1},
            {'name_en': 'Adrak', 'name_hi': 'अदरक', 'description': 'Dried Ginger • Sharp & Zesty', 'icon': 'eco', 'default_intensity': 60, 'display_order': 2},
            {'name_en': 'Laung', 'name_hi': 'लौंग', 'description': 'Cloves • Intensely Pungent', 'icon': 'park', 'default_intensity': 15, 'display_order': 3},
            {'name_en': 'Dalchini', 'name_hi': 'दालचीनी', 'description': 'Cinnamon • Woody & Sweet', 'icon': 'forest', 'default_intensity': 45, 'display_order': 4},
            {'name_en': 'Saunf', 'name_hi': 'सौंफ', 'description': 'Fennel • Cooling & Refreshing', 'icon': 'filter_vintage', 'default_intensity': 20, 'display_order': 5},
            {'name_en': 'Kesar', 'name_hi': 'केसर', 'description': 'Saffron • Earthy & Regal', 'icon': 'diamond', 'default_intensity': 10, 'display_order': 6},
        ]
        for spice_data in spices:
            SpiceOption.objects.get_or_create(name_en=spice_data['name_en'], defaults=spice_data)
        self.stdout.write(f'  ✓ {len(spices)} spice options created')

    def _seed_reward_tiers(self):
        tiers = [
            {'name': 'Pehla Cup', 'slug': 'pehla-cup', 'min_tokens': 0, 'max_tokens': 500, 'icon': 'filter_vintage', 'color': '#cd7f32', 'description': 'Your journey begins with the first sip.', 'perks': ['Free delivery on orders above ₹499', 'Birthday month 2x tokens']},
            {'name': 'Chai Premi', 'slug': 'chai-premi', 'min_tokens': 500, 'max_tokens': 2000, 'icon': 'workspace_premium', 'color': '#c0c0c0', 'description': 'A true lover of the craft, recognized by the Haveli.', 'perks': ['Free delivery always', '5% off all orders', 'Early access to seasonal blends', 'Birthday month 3x tokens']},
            {'name': 'Masala Raja', 'slug': 'masala-raja', 'min_tokens': 2000, 'max_tokens': 5000, 'icon': 'military_tech', 'color': '#ffd700', 'description': 'Royalty among tea drinkers. The Raja commands respect.', 'perks': ['10% off all orders', 'Free monthly sampler box', 'Exclusive Raja-only blends', 'Priority customer support', 'Birthday month 5x tokens']},
            {'name': 'Shahi Mehman', 'slug': 'shahi-mehman', 'min_tokens': 5000, 'max_tokens': None, 'icon': 'castle', 'color': '#b9f2ff', 'description': 'The most honored guest. The Haveli opens its doors for you.', 'perks': ['15% off all orders', 'Free quarterly brass canister', 'Annual private tasting event', 'Complimentary Haveli reservation', 'Dedicated sommelier on WhatsApp', 'Birthday month 10x tokens']},
        ]
        for tier_data in tiers:
            RewardTier.objects.get_or_create(slug=tier_data['slug'], defaults=tier_data)
        self.stdout.write(f'  ✓ {len(tiers)} reward tiers created')

    def _seed_estates_and_farmers(self):
        estates_data = [
            {
                'name': 'Darjeeling Heritage Gardens',
                'tagline': 'The Champagne of Teas',
                'description': 'At 6,700 feet in the misty Himalayan foothills, our Darjeeling gardens produce the world\'s most celebrated muscatel teas. The unique terroir — cool temperatures, high rainfall, and volcanic soil — creates a flavour profile that cannot be replicated anywhere on Earth.',
                'altitude': '6,700 ft',
                'region': 'West Bengal',
                'map_latitude': 27.0360,
                'map_longitude': 88.2627,
                'display_order': 1,
                'farmers': [
                    {'name': 'Anirudh Sharma', 'generation': '4th Generation Grower', 'bio': 'Anirudh has tended these slopes since childhood, following the lunar picking calendar passed down from his great-grandfather.', 'quote': 'The mountain teaches patience. The leaf teaches humility.'},
                ],
            },
            {
                'name': 'Assam Royal Estate',
                'tagline': 'Bold & Malty Tradition',
                'description': 'The lush lowlands of the Brahmaputra valley produce India\'s most robust teas. Our Assam estate, established in 1892, cultivates the indigenous Camellia sinensis var. assamica for rich, full-bodied CTC blends.',
                'altitude': '200 ft',
                'region': 'Assam',
                'map_latitude': 26.7509,
                'map_longitude': 94.2037,
                'display_order': 2,
                'farmers': [
                    {'name': 'Biren Gogoi', 'generation': '3rd Generation Master Blender', 'bio': 'Biren can identify 47 distinct flavour notes by nose alone. His blends have won the Golden Leaf Award three times.', 'quote': 'Every cup of Assam carries the strength of the Brahmaputra.'},
                ],
            },
            {
                'name': 'Nilgiri Blue Mountain',
                'tagline': 'Fragrant Southern Highlands',
                'description': 'In the Blue Mountains of Tamil Nadu, our Nilgiri estate sits at 5,500 feet surrounded by eucalyptus forests. The result: a brisk, aromatic tea with subtle citrus notes — India\'s best-kept secret.',
                'altitude': '5,500 ft',
                'region': 'Tamil Nadu',
                'map_latitude': 11.4064,
                'map_longitude': 76.6932,
                'display_order': 3,
                'farmers': [
                    {'name': 'Kavitha Rajan', 'generation': '2nd Generation Estate Manager', 'bio': 'Kavitha pioneered organic certification for the entire estate in 2019, making it South India\'s first fully organic tea garden.', 'quote': 'When we respect the soil, the leaf respects us back.'},
                ],
            },
        ]

        for estate_data in estates_data:
            farmers_data = estate_data.pop('farmers', [])
            estate, _ = Estate.objects.get_or_create(name=estate_data['name'], defaults=estate_data)
            for farmer_data in farmers_data:
                Farmer.objects.get_or_create(name=farmer_data['name'], estate=estate, defaults=farmer_data)

        self.stdout.write(f'  ✓ {len(estates_data)} estates with farmers created')

    def _seed_blog_posts(self):
        posts = [
            {
                'title': 'The Lost Recipe of Lucknowi Irani Chai',
                'slug': 'lost-recipe-lucknowi-irani-chai',
                'category': 'history',
                'excerpt': 'In the narrow lanes of Chowk, a 200-year-old recipe was nearly lost to time. This is the story of how we found it — written on the back of a Mughal-era ledger.',
                'body': 'The year was 1823. In a cramped kitchen behind the Asafi Imambara in Lucknow, a man named Mirza Haider was experimenting with Iranian saffron and Indian spices...\n\nAfter decades of obscurity, this recipe was rediscovered in 2024 when a Heritage Brews researcher stumbled upon the original manuscript during a renovation of the old Chowk market.\n\nThe blend combines three types of saffron, slow-roasted cardamom, and a technique of double-brewing that produces a cup unlike anything else in the world.\n\nToday, our Zaffrani Masala Chai is directly inspired by Mirza Haider\'s original notes, adapted for the modern palate while preserving every ounce of its 200-year-old soul.',
                'author_name': 'Priya Mathur',
                'read_time': 8,
                'is_featured': True,
            },
            {
                'title': 'The Science of the Perfect Chai',
                'slug': 'science-perfect-chai',
                'category': 'guide',
                'excerpt': 'Temperature, timing, and the ratio of milk to water — why your grandmother\'s chai tasted better than anything from a café.',
                'body': 'The perfect cup of masala chai is a chemical symphony. The tannins in black tea extract at exactly 90°C, the essential oils in cardamom release at 85°C, and ginger\'s gingerol compound requires at least 3 minutes of simmering...\n\nThe golden ratio as practiced in Heritage Brews kitchens: 1 part tea to 2 parts water to 1 part full-fat milk. Boil the water first, add spices, simmer 3 minutes, add tea leaves, steep 2 minutes, then add milk and bring to a single boil.\n\nNever boil tea leaves directly — it releases excess tannins, creating bitterness. And always use loose leaf over teabags.',
                'author_name': 'Dr. Arun Verma',
                'read_time': 6,
                'is_featured': False,
            },
            {
                'title': 'Monsoon Malabar: How Rain Makes Coffee',
                'slug': 'monsoon-malabar-rain-coffee',
                'category': 'origin',
                'excerpt': 'Every June, warehouses on the Malabar coast open their doors to the monsoon winds. What happens next transforms green coffee beans into liquid gold.',
                'body': 'The Monsoon Malabar process is one of coffee\'s greatest accidents. In the 18th century, raw coffee beans shipped from India to Europe in wooden hulls would absorb moisture during the 6-month sea voyage, swelling and losing their acidity...\n\nToday, we replicate this process deliberately. Green beans are spread on open warehouse floors along the Malabar coast and exposed to monsoon winds for 12-16 weeks. The beans swell to nearly double their size, turning from green to a pale gold.\n\nThe result: a heavy-bodied, low-acid cup with notes of dark chocolate, earth, and spice — unlike any other coffee on Earth.',
                'author_name': 'Heritage Brews Editorial',
                'read_time': 7,
                'is_featured': True,
            },
        ]

        for post_data in posts:
            BlogPost.objects.get_or_create(slug=post_data['slug'], defaults=post_data)
        self.stdout.write(f'  ✓ {len(posts)} blog posts created')

    def _create_superuser(self):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@heritagebrews.in',
                password='heritage2026',
                first_name='Heritage',
                last_name='Admin',
            )
            self.stdout.write('  ✓ Superuser created (admin / heritage2026)')
        else:
            self.stdout.write('  ✓ Superuser already exists')
