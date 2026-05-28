from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from datetime import date, timedelta
from unittest.mock import patch
from reservations.models import Reservation
from reservations.serializers import ReservationCreateSerializer


class ReservationCodeGenerationTest(TestCase):
    """
    Test suite for unique confirmation code generation in the Reservation model.
    """

    def setUp(self):
        self.user = User.objects.create_user(
            username="reservationpatron",
            email="respatron@heritagebrews.com",
            password="SecurePassword123"
        )
        self.reservation_data = {
            'user': self.user,
            'patron_name': 'Raja Patron',
            'phone': '9876543210',
            'scope': 'table',
            'date': date.today() + timedelta(days=2),
            'time_or_duration': '18:00 - 20:00',
            'guests': '3-5',
            'occasion': 'birthday',
            'special_instructions': 'Near the window, please.'
        }

    def test_confirmation_code_generated_automatically(self):
        reservation = Reservation.objects.create(**self.reservation_data)
        
        # Verify code is not empty
        self.assertTrue(reservation.confirmation_code)
        
        # Verify code format (e.g. starts with 'HB' followed by 4 digits)
        self.assertTrue(reservation.confirmation_code.startswith('HB'))
        self.assertEqual(len(reservation.confirmation_code), 6)
        
        digits = reservation.confirmation_code[2:]
        self.assertTrue(digits.isdigit())

    @patch('random.choices')
    def test_confirmation_code_collision_resolution(self, mock_choices):
        # We want to simulate a collision.
        # random.choices will return '1234' on first call (which matches an existing reservation),
        # and '5678' on the second call (which is unique).
        
        # First, let's create a reservation with code HB1234
        existing_res = Reservation.objects.create(**self.reservation_data)
        existing_res.confirmation_code = 'HB1234'
        existing_res.save()

        # Mock random.choices to return ['1', '2', '3', '4'] on first call,
        # and ['5', '6', '7', '8'] on the second call.
        mock_choices.side_effect = [['1', '2', '3', '4'], ['5', '6', '7', '8']]

        # Create new reservation
        new_res = Reservation.objects.create(**self.reservation_data)

        # It should have looped and selected 'HB5678' after detecting collision with 'HB1234'
        self.assertEqual(new_res.confirmation_code, 'HB5678')
        self.assertEqual(mock_choices.call_count, 3)


class ReservationValidationTest(TestCase):
    """
    Test suite for date validation and status transition validation in reservations.
    """

    def setUp(self):
        self.past_date = date.today() - timedelta(days=1)
        self.future_date = date.today() + timedelta(days=1)

    def test_serializer_past_date_validation(self):
        # Check that ReservationCreateSerializer raises ValidationError for past dates
        data = {
            'patron_name': 'Raja Patron',
            'phone': '9876543210',
            'scope': 'table',
            'date': self.past_date,
            'time_or_duration': '18:00 - 20:00',
            'guests': '3-5',
            'occasion': 'birthday',
            'special_instructions': 'None'
        }
        
        serializer = ReservationCreateSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('date', serializer.errors)
        self.assertEqual(serializer.errors['date'][0], 'Reservation date cannot be in the past.')

    def test_serializer_future_date_validation_passes(self):
        # Check that ReservationCreateSerializer passes for future dates
        data = {
            'patron_name': 'Raja Patron',
            'phone': '9876543210',
            'scope': 'table',
            'date': self.future_date,
            'time_or_duration': '18:00 - 20:00',
            'guests': '3-5',
            'occasion': 'birthday',
            'special_instructions': 'None'
        }
        
        serializer = ReservationCreateSerializer(data=data)
        self.assertTrue(serializer.is_valid())


class ReservationViewsTest(APITestCase):
    """
    Test suite for Reservation API endpoints (Check status, Cancellation).
    """

    def setUp(self):
        self.reservation = Reservation.objects.create(
            patron_name='Vazir Patron',
            phone='9876543210',
            scope='table',
            date=date.today() + timedelta(days=5),
            time_or_duration='19:00',
            guests='1-2',
            occasion='casual',
            status='pending'
        )
        self.code = self.reservation.confirmation_code

    def test_get_reservation_status_by_code(self):
        url = reverse('reservation-status', kwargs={'code': self.code})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['confirmation_code'], self.code)
        self.assertEqual(response.data['status'], 'pending')
        self.assertEqual(response.data['patron_name'], 'Vazir Patron')

    def test_cancel_pending_reservation_success(self):
        url = reverse('reservation-cancel', kwargs={'code': self.code})
        response = self.client.put(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Reservation cancelled successfully.')
        self.assertEqual(response.data['reservation']['status'], 'cancelled')

        # Verify in database
        self.reservation.refresh_from_db()
        self.assertEqual(self.reservation.status, 'cancelled')

    def test_cancel_already_cancelled_reservation_fails(self):
        # Set status to cancelled
        self.reservation.status = 'cancelled'
        self.reservation.save()

        url = reverse('reservation-cancel', kwargs={'code': self.code})
        response = self.client.put(url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Reservation is already cancelled.')

    def test_cancel_completed_reservation_fails(self):
        # Set status to completed
        self.reservation.status = 'completed'
        self.reservation.save()

        url = reverse('reservation-cancel', kwargs={'code': self.code})
        response = self.client.put(url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Reservation is already completed.')
