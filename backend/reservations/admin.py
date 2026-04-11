from django.contrib import admin
from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['confirmation_code', 'patron_name', 'date', 'time_or_duration', 'scope', 'guests', 'occasion', 'status']
    list_filter = ['status', 'scope', 'occasion', 'date']
    search_fields = ['patron_name', 'phone', 'confirmation_code']
    list_editable = ['status']
    date_hierarchy = 'date'
    readonly_fields = ['confirmation_code', 'created_at', 'updated_at']
