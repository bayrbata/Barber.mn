
from django.urls import path
from barberApp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('apibarber/', views.checkService),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)