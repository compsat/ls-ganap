from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_events.views import event_view, host_view, host_type_view, tag_view, venue_view
# import views

urlpatterns = [
    path('events/', event_view.EventList.as_view()),
    path('get_events_on/<str:date>', event_view.FilterEventByDate.as_view()),
    path('get_events_between/', event_view.FilterEventsBetweenDates.as_view()),
    path('get_events_by_week/<str:date>', event_view.FilterEventByWeek.as_view()),
    path('get_events_by_month/<str:date>', event_view.FilterEventByMonth.as_view()),
    path('events/<int:pk>/', event_view.EventDetail.as_view()),
    path('event_hosts/', host_view.HostList.as_view()),
    path('event_hosts/<int:pk>/', host_view.HostDetail.as_view()),
    path('get_host_events/<int:pk>/', host_view.HostEventsList.as_view()),
    path('host_types/', host_type_view.HostTypeList.as_view()),
    path('host_types/<int:pk>/', host_type_view.HostTypeDetail.as_view()),
    path('tags/', tag_view.TagList.as_view()),
    path('tags/<int:pk>/', tag_view.TagDetail.as_view()),
    path('venues/', venue_view.VenueList.as_view()),
    path('venues/<int:pk>/', venue_view.VenueDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)