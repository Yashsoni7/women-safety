from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import CrimeSerializer
from rest_framework.response import Response
from .models import Crime

@api_view(['POST'])
def ReportCrime(request):
    if request.method == 'POST':
        ser = CrimeSerializer(data=request.data)    

        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors)

@api_view(['GET'])
def ShowCrimes(request):
    if request.method == 'GET':
        crime_obj = Crime.objects.filter(helped=False)
        ser = CrimeSerializer(crime_obj, many=True)
        return Response(ser.data)