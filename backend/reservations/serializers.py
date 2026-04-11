from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'id', 'patron_name', 'phone', 'scope', 'date', 'time_or_duration',
            'guests', 'occasion', 'special_instructions', 'status',
            'confirmation_code', 'created_at',
        ]
        read_only_fields = ['id', 'status', 'confirmation_code', 'created_at']


class ReservationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'patron_name', 'phone', 'scope', 'date', 'time_or_duration',
            'guests', 'occasion', 'special_instructions',
        ]

    def validate_date(self, value):
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError('Reservation date cannot be in the past.')
        return value
