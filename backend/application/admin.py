from django.contrib import admin
from .models import Applications

# Register your models here.
@admin.register(Applications)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("company", "role", "status", "applied_date", "updated_at")
    list_filter = ("status",)
    search_fields = ("company", "role")