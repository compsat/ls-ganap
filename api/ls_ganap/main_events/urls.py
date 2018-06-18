from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_events import views

urlpatterns = [
    path('events/', views.EventList.as_view()),
    path('events/<int:pk>/', views.EventDetail.as_view()),
    path('event_hosts/', views.HostList.as_view()),
    path('event_hosts/<int:pk>/', views.HostDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)