from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_events import views

urlpatterns = [
    path('event/', views.EventList.as_view()),
    path('event/<int:pk>/', views.EventDetail.as_view()),
    path('event_host/', views.HostList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)