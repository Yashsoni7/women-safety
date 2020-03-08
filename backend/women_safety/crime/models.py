from django.db import models
from user.models import women

class Crime(models.Model):
    number = models.ForeignKey(women,on_delete=models.CASCADE)
    lattitude = models.CharField(max_length = 100)
    longitude = models.CharField(max_length = 100)
    helped = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)

class CrimeImages(models.Model):
    image = models.ImageField()

