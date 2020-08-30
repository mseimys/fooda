from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin

from core.models import Restaurant, User


@admin.register(User)
class UserAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ("user_type",)
    list_filter = BaseAdmin.list_filter + ("user_type",)
    fieldsets = BaseAdmin.fieldsets + (("Advanced options", {"fields": ("user_type",)},),)


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner")
