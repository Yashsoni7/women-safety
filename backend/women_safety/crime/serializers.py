from rest_framework import serializers
from .models import Crime, CrimeImages

class CrimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crime
        fields = '__all__'

class CrimeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrimeImages
        fields = '__all__'