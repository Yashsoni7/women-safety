from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import women
from .serializers import WomenSerializer
from rest_framework.response import Response
from sendotp import sendotp
from random import randint

@api_view(['POST'])
def SignupAPI(request):
    
    if request.method == 'POST':
        data = request.data
        data.update({"password":"pass@123"})
        wom = women.objects.get(pk=data["phone_number"])
        ser = WomenSerializer(wom,data=data)

        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors)

@api_view(['POST'])
def PhoneNumberAPI(request):
    if request.method == 'POST':
        data = request.data
        ser = WomenSerializer(data=data)
        data.update({"password":"pass@123"})

        if ser.is_valid():
            otpobj =  sendotp.sendotp('297047A6xLaSwM25d9614b0','my message is {{otp}} keep otp with you.')
            otpobj.send(data['phone_number'],'msgind',randint(1000,9999))
            ser.save()
            return Response(ser.data)
        return Response(ser.errors)

@api_view(['POST'])
def OTPVerify(request):
    if request.method == 'POST':
        data = request.data
        num = data['phone_number']
        otp = data['otp']
        otpobj =  sendotp.sendotp('297047A6xLaSwM25d9614b0','my message is {{otp}} keep otp with you.')
        res = otpobj.verify(num,otp)
        print(res)
        return Response(res)


