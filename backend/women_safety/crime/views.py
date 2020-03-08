from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import CrimeSerializer, CrimeImageSerializer
from rest_framework.response import Response
from .models import Crime
from user.models import women
import requests
import json
from rest_framework.parsers import FileUploadParser
from datetime import datetime, timedelta
import pytz
from .models import CrimeImages

@api_view(['POST'])
def ReportCrime(request):
    if request.method == 'POST':
        data = request.data
        req = requests.get('https://us1.locationiq.com/v1/reverse.php?key=c3878484ac573f&lat=' + str(data['lattitude']) + '&lon=' + str(data['longitude']) + '&format=json')
        dat = json.loads(req.text)
        data.update({"address":dat["display_name"],"time":datetime.now() + timedelta(hours=5.5)})
        ser = CrimeSerializer(data=request.data)

        if ser.is_valid():
            ser.save()
            cont = women.objects.get(pk=request.data['number'])
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
            res.update({"address":data["address"]})
            return Response(res)
        return Response(ser.errors)

@api_view(['GET'])
def ShowCrimes(request):
    if request.method == 'GET':
        crime_obj = Crime.objects.filter(helped=False)
        print(crime_obj)
        li = []
        for i in crime_obj:
            li.append({"name":women.objects.get(pk=i.number.phone_number).name,"number":i.number.phone_number,"address":i.address,"lattitude":i.lattitude,"longitude":i.longitude, "time":i.time.strftime("%m/%d/%Y, %H:%M:%S")})
            print(type(i.time))
        return Response(li)

@api_view(['POST'])
def SendImages(request):
    parser_class = (FileUploadParser,)
    if request.method == "POST":
        ser = CrimeImageSerializer(data=request.data)

        if ser.is_valid():
            ser.save()
            print(ser.data)
            return Response(ser.data)
        return Response(ser.errors)

@api_view(['GET'])
def ShowImages(request):
    if request.method == "GET":
        img = CrimeImages.objects.all()
        ser = CrimeImageSerializer(img,many=True)
        return Response(ser.data)