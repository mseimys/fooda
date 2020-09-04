from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin

from core.models import Restaurant, User, Meal, BlockedUser, Order, OrderHistoryItem

admin.site.site_header = "Fooda admin"
admin.site.site_title = "Fooda admin"
admin.site.index_title = "Fooda administration"


@admin.register(User)
class UserAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ("user_type",)
    list_filter = BaseAdmin.list_filter + ("user_type",)
    fieldsets = BaseAdmin.fieldsets + (("Advanced options", {"fields": ("user_type",)},),)


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner")


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "restaurant")


admin.site.register(BlockedUser, admin.ModelAdmin)
admin.site.register(Order, admin.ModelAdmin)
admin.site.register(OrderHistoryItem, admin.ModelAdmin)
