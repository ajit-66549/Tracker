from django.urls import path
from .auth_views import login, refresh, logout

urlpatterns = [
    path('login/', login),
    path('refresh/', refresh),
    path('logout/', logout),
]