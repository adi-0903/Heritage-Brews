from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch, MagicMock
from accounts.models import UserProfile


class UserProfileSignalTest(TestCase):
    """
    Test suite for UserProfile creation and save signals.
    """

    def test_profile_created_automatically_with_user(self):
        # Create a new user
        user = User.objects.create_user(
            username="testpatron",
            email="testpatron@heritagebrews.com",
            password="SecurePassword123"
        )
        
        # Verify that UserProfile was created automatically via post_save signal
        self.assertTrue(hasattr(user, 'profile'))
        profile = user.profile
        self.assertIsInstance(profile, UserProfile)
        self.assertEqual(profile.user, user)
        self.assertEqual(profile.tea_tokens, 0)
        self.assertEqual(profile.loyalty_tier, 'naya_patron')
        self.assertEqual(profile.phone, '')
        self.assertEqual(profile.default_address, '')

    def test_profile_saved_when_user_saved(self):
        # Create user
        user = User.objects.create_user(
            username="savingpatron",
            email="savingpatron@heritagebrews.com",
            password="SecurePassword123"
        )
        profile = user.profile
        
        # Modify profile attribute
        profile.phone = "9876543210"
        profile.save()
        
        # Save user to trigger save_user_profile signal
        user.save()
        
        # Reload and check
        reloaded_user = User.objects.get(pk=user.pk)
        self.assertEqual(reloaded_user.profile.phone, "9876543210")


class LoyaltyTierCalculationTest(TestCase):
    """
    Test suite for loyalty tier calculations, including recalculate_tier and next_tier_tokens.
    """

    def setUp(self):
        self.user = User.objects.create_user(
            username="tierpatron",
            email="tierpatron@heritagebrews.com",
            password="SecurePassword123"
        )
        self.profile = self.user.profile

    def test_recalculate_tier_naya_patron(self):
        # 0 - 999 tokens
        self.profile.tea_tokens = 500
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'naya_patron')
        self.assertEqual(self.profile.next_tier_tokens, 500)

    def test_recalculate_tier_brass_baron(self):
        # 1000 - 4999 tokens
        self.profile.tea_tokens = 1000
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'brass_baron')
        self.assertEqual(self.profile.next_tier_tokens, 4000)

        self.profile.tea_tokens = 4999
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'brass_baron')
        self.assertEqual(self.profile.next_tier_tokens, 1)

    def test_recalculate_tier_heritage_keeper(self):
        # 5000 - 14999 tokens
        self.profile.tea_tokens = 5000
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'heritage_keeper')
        self.assertEqual(self.profile.next_tier_tokens, 10000)

        self.profile.tea_tokens = 14999
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'heritage_keeper')
        self.assertEqual(self.profile.next_tier_tokens, 1)

    def test_recalculate_tier_maharaja(self):
        # 15000+ tokens
        self.profile.tea_tokens = 15000
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'maharaja')
        self.assertEqual(self.profile.next_tier_tokens, 0)

        self.profile.tea_tokens = 25000
        self.profile.recalculate_tier()
        self.assertEqual(self.profile.loyalty_tier, 'maharaja')
        self.assertEqual(self.profile.next_tier_tokens, 0)


class GoogleLoginViewTest(APITestCase):
    """
    Test suite for Google OAuth callback view (GoogleLoginView).
    """

    def setUp(self):
        self.url = reverse('auth-google')

    @patch('accounts.views.id_token.verify_oauth2_token')
    def test_google_login_new_user_with_credential(self, mock_verify):
        # Configure mock for successful token verification (new user)
        mock_verify.return_value = {
            'email': 'newpatron@gmail.com',
            'given_name': 'Naya',
            'family_name': 'Patron'
        }

        data = {'credential': 'valid-mock-credential-token'}
        response = self.client.post(self.url, data, format='json')

        # Check response status and returned body
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Google login successful.')
        self.assertEqual(response.data['user']['email'], 'newpatron@gmail.com')
        self.assertEqual(response.data['user']['first_name'], 'Naya')
        self.assertEqual(response.data['user']['last_name'], 'Patron')
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])

        # Verify user was created in the database
        user_exists = User.objects.filter(email='newpatron@gmail.com').exists()
        self.assertTrue(user_exists)
        user = User.objects.get(email='newpatron@gmail.com')
        self.assertEqual(user.first_name, 'Naya')
        self.assertEqual(user.last_name, 'Patron')

    @patch('accounts.views.id_token.verify_oauth2_token')
    def test_google_login_existing_user_with_credential(self, mock_verify):
        # Pre-create the user
        existing_user = User.objects.create_user(
            username="existingpatron",
            email="existingpatron@gmail.com",
            first_name="Purana",
            last_name="Patron",
            password="GoogleCreatedRandomPassword"
        )

        mock_verify.return_value = {
            'email': 'existingpatron@gmail.com',
            'given_name': 'Purana',
            'family_name': 'Patron'
        }

        data = {'credential': 'valid-mock-credential-token'}
        response = self.client.post(self.url, data, format='json')

        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Google login successful.')
        self.assertEqual(response.data['user']['username'], 'existingpatron')
        self.assertEqual(response.data['user']['email'], 'existingpatron@gmail.com')
        
        # Verify no new user was created
        self.assertEqual(User.objects.filter(email='existingpatron@gmail.com').count(), 1)

    @patch('requests.get')
    def test_google_login_with_access_token(self, mock_get):
        # Configure mock for requests.get to Google userinfo
        mock_response = MagicMock()
        mock_response.ok = True
        mock_response.json.return_value = {
            'email': 'accesstokenpatron@gmail.com',
            'given_name': 'Access',
            'family_name': 'Token'
        }
        mock_get.return_value = mock_response

        data = {'access_token': 'mock-access-token'}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Google login successful.')
        self.assertEqual(response.data['user']['email'], 'accesstokenpatron@gmail.com')
        self.assertTrue(User.objects.filter(email='accesstokenpatron@gmail.com').exists())

    @patch('accounts.views.id_token.verify_oauth2_token')
    def test_google_login_failed_verification(self, mock_verify):
        # Mock verification failure
        mock_verify.side_effect = ValueError("Invalid token signature")

        data = {'credential': 'invalid-mock-credential-token'}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertIn('Google authentication failed', response.data['error'])
