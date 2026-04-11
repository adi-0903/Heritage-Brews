from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from memberships.serializers import MembershipTierSerializer
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    active_membership = MembershipTierSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'phone', 'avatar', 'default_address', 'default_city',
            'default_pincode', 'tea_tokens', 'loyalty_tier',
            'next_tier_tokens', 'active_membership', 'created_at',
        ]
        read_only_fields = ['tea_tokens', 'loyalty_tier', 'next_tier_tokens', 'created_at']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']
        read_only_fields = ['id']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True, required=False, default='')
    first_name = serializers.CharField(required=False, allow_blank=True, default='')
    last_name = serializers.CharField(required=False, allow_blank=True, default='')

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2', 'phone']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        phone = validated_data.pop('phone', '')
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        # Update the auto-created profile with phone
        if phone:
            user.profile.phone = phone
            user.profile.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """Allows updating both User fields and Profile fields together."""
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    email = serializers.EmailField(source='user.email', required=False)

    class Meta:
        model = UserProfile
        fields = [
            'first_name', 'last_name', 'email',
            'phone', 'avatar', 'default_address', 'default_city', 'default_pincode',
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user

        # Update User fields
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        # Update Profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
