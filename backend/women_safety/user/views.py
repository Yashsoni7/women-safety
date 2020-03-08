from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import women
from .serializers import WomenSerializer
from rest_framework.response import Response
from sendotp import sendotp
from random import randint
import http.client
import json

conn = http.client.HTTPSConnection("api.msg91.com")

headers = { 'content-type': "application/json" }

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
        data.update({"password":"pass@123"})
        conn.request("GET", 'https://api.msg91.com/api/v5/otp?authkey=297047A6xLaSwM25d9614b0&template_id=5e63ebb7d6fc051193630842&extra_param={"OTP":' + str(randint(1000,9999)) + '}&mobile='+data['phone_number'],headers=headers)
        res = conn.getresponse()
        resp = res.read()
        print(resp.decode("utf-8"))
        if (women.objects.get(pk=data["phone_number"])):
            pass
        else:
            wo = women(phone_number=data["phone_number"],password = data["password"])
            wo.save()
            return Response({"message":"New Entry"})
        return Response({"message":"Existing Entry"})

@api_view(['POST'])
def OTPVerify(request):
    if request.method == 'POST':
        data = request.data
        num = data['phone_number']
        otp = data['otp']
        conn.request("POST", "/api/v5/otp/verify?mobile=918779079797&otp=" + otp + "&authkey=297047A6xLaSwM25d9614b0","")
        res = conn.getresponse()
        resp = res.read()
        dct = json.loads(resp.decode("utf-8"))
        return Response(dct)


@api_view(['POST'])
def ShowContacts(request):
    if request.method == 'POST':
        cont = women.objects.get(pk=request.data['phone_number'])
        res = {}
        if (cont.emergency_contact1):
            res.update({"emergency_contact1":cont.emergency_contact1})
        if (cont.emergency_contact2):
            res.update({"emergency_contact2":cont.emergency_contact2})
        if (cont.emergency_contact3):
            res.update({"emergency_contact3":cont.emergency_contact3})
        if (cont.emergency_contact4):
            res.update({"emergency_contact4":cont.emergency_contact4})
        if (cont.emergency_contact5):
            res.update({"emergency_contact5":cont.emergency_contact5})
        return Response(res)

        