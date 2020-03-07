from rest_framework import serializers
from .models import women

class WomenSerializer(serializers.ModelSerializer):
    class Meta:
        model = women
        fields = '__all__'