
from django.urls import path
from barberApp import views

urlpatterns = [
    path('apibarber/', views.checkService),
]
