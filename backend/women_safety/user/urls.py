from django.urls import path
from . import views

urlpatterns = [
    path('signup/',views.SignupAPI),
    path('number/',views.PhoneNumberAPI),
    path('verify/',views.OTPVerify),
    path('contacts/',views.ShowContacts)
]