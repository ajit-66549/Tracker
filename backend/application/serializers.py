from rest_framework import serializers
from .models import Applications

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = "__all__"
        