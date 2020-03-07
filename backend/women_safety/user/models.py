from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class women(AbstractBaseUser):
    phone_number = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100,null=True)
    emergency_contact1 = models.IntegerField(null=True)
    emergency_contact2 = models.IntegerField(null=True)
    emergency_contact3 = models.IntegerField(null=True)
    emergency_contact4 = models.IntegerField(null=True)
    emergency_contact5 = models.IntegerField(null=True)
    otp_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone_number'

    def __str__(self):
        return str(self.phone_number)

    