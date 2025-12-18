from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health, name="health"),
    path('applications/', views.application_list_create, name="applications"),
    path('applications/<int:pk>/', views.application_detail, name="detail"),
]
