from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Reservation
from .serializers import ReservationSerializer, ReservationCreateSerializer


class ReservationCreateView(generics.CreateAPIView):
    """POST /api/reservations/ — Create a new reservation."""
    serializer_class = ReservationCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        reservation = serializer.instance
        return Response({
            'message': 'Reservation created successfully!',
            'confirmation_code': reservation.confirmation_code,
            'reservation': ReservationSerializer(reservation).data,
        }, status=status.HTTP_201_CREATED)


class ReservationListView(generics.ListAPIView):
    """GET /api/reservations/ — List user's reservations."""
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)


class AdminReservationListView(generics.ListAPIView):
    """GET /api/reservations/admin/all/ — List all reservations for admins."""
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminUser]
    queryset = Reservation.objects.all().order_by('-date', '-created_at')


class AdminReservationUpdateView(generics.UpdateAPIView):
    """PUT /api/reservations/admin/<code>/ — Update reservation status."""
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminUser]
    queryset = Reservation.objects.all()
    lookup_field = 'confirmation_code'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        status_val = request.data.get('status')
        if status_val:
            instance.status = status_val
            instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def reservation_status(request, code):
    """GET /api/reservations/<code>/ — Check reservation status by confirmation code."""
    reservation = get_object_or_404(Reservation, confirmation_code=code)
    return Response(ReservationSerializer(reservation).data)


@api_view(['PUT'])
@permission_classes([AllowAny])
def reservation_cancel(request, code):
    """PUT /api/reservations/<code>/cancel/ — Cancel a reservation."""
    reservation = get_object_or_404(Reservation, confirmation_code=code)
    if reservation.status in ['cancelled', 'completed']:
        return Response(
            {'error': f'Reservation is already {reservation.status}.'},
            status=status.HTTP_400_BAD_REQUEST,
        )
    reservation.status = 'cancelled'
    reservation.save()
    return Response({
        'message': 'Reservation cancelled successfully.',
        'reservation': ReservationSerializer(reservation).data,
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def reservation_availability(request):
    """GET /api/reservations/availability/?date=2026-04-15 — Check availability."""
    date = request.query_params.get('date')
    if not date:
        return Response({'error': 'date query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

    existing = Reservation.objects.filter(
        date=date,
        status__in=['pending', 'confirmed'],
    ).count()

    max_slots = 20  # Max reservations per day
    return Response({
        'date': date,
        'booked': existing,
        'available': max(0, max_slots - existing),
        'is_available': existing < max_slots,
    })
