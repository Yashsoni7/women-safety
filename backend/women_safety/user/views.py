from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import women
from .serializers import WomenSerializer
from rest_framework.response import Response
from random import randint
import http.client
import json
from twilio.rest import Client
from crime.models import CrimeImages

@api_view(['POST'])
def SignupAPI(request):
    
    if request.method == 'POST':
        data = request.data
        print(data)
        data.update({"password":"pass@123"})
        print(data["phone_number"])
        wom = women.objects.get(phone_number=data["phone_number"])
        print(wom)
        ser = WomenSerializer(wom,data=data)
        print(ser)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors)

@api_view(['POST'])
def PhoneNumberAPI(request):
    if request.method == 'POST':
        data = request.data
        data.update({"password":"pass@123"})
        conn = http.client.HTTPSConnection("api.msg91.com")
        headers = { 'content-type': "application/json" }
        conn.request("GET", 'https://api.msg91.com/api/v5/otp?authkey=297047A6xLaSwM25d9614b0&template_id=5e63ebb7d6fc051193630842&extra_param={"OTP":' + str(randint(1000,9999)) + '}&mobile='+data['phone_number'],headers=headers)
        res = conn.getresponse()
        resp = res.read()
        print(resp.decode("utf-8"))
        try:
            wo = women.objects.get(phone_number=data["phone_number"])
            return Response({"message":"Existing Entry"})
        except:
            wom = women(phone_number=data["phone_number"],password = data["password"],name = data['name'])
            wom.save()
            return Response({"message":"New Entry"})
        
@api_view(['POST'])
def OTPVerify(request):
    if request.method == 'POST':
        data = request.data
        num = data['phone_number']
        otp = data['otp']
        conn = http.client.HTTPSConnection("api.msg91.com")
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
        # img = CrimeImages.objects.all()
        # res2 = {"images":[]}
        # for i in img:
        #     res2["images"].append(i.image)
        # print(res,res2)
        return Response(res)

# @api_view(["POST"])
# def SendSMS(request):
#     account_sid = 'ACc6c0ac6fb4951f1ece50912967cd3444'
#     auth_token = '029998f2218ed82af35e5561732b57fb'
#     client = Client(account_sid, auth_token)

#     message = client.messages \
#                     .create(
#                         body="Your Friend needs help",
#                         from_='+12052933998',
#                         to='+918779079797'
#                     )
#     print(message.sid)

