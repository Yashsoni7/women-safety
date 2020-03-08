from django.urls import path
from . import views

urlpatterns = [
    path('report/',views.ReportCrime),
    path('show/',views.ShowCrimes),
    path('image/',views.SendImages),
]
