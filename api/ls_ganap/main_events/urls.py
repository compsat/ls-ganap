from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_events.views import event_view, cluster_view, host_view, host_type_view, tag_view, venue_view, user_view, cloudinary_view
# import views

urlpatterns = [
    path('events/', event_view.EventList.as_view()),
    path('events/<int:pk>/', event_view.EventDetail.as_view()),
    path('events/logistics/<int:pk>/', event_view.EventLogisticCreate.as_view()),
    path('events/on/<str:date>', event_view.FilterEventByDate.as_view()),
    path('events/between/', event_view.FilterEventsBetweenDates.as_view()),
    path('events/week/<str:date>', event_view.FilterEventByWeek.as_view()),
    path('events/month/<str:date>', event_view.FilterEventByMonth.as_view()),
    path('event_hosts/', host_view.HostList.as_view()),
    path('event_hosts/<int:pk>/', host_view.HostDetail.as_view()),
    path('host_types/', host_type_view.HostTypeList.as_view()),
    path('host_types/<int:pk>/', host_type_view.HostTypeDetail.as_view()),
    path('tags/', tag_view.TagList.as_view()),
    path('tags/<int:pk>/', tag_view.TagDetail.as_view()),
    path('clusters/', cluster_view.ClusterList.as_view()),
    path('clusters/<int:pk>', cluster_view.ClusterDetail.as_view()),
    path('venues/', venue_view.VenueList.as_view()),
    path('venues/<int:pk>/', venue_view.VenueDetail.as_view()),
    path('upload_image/', cloudinary_view.upload)
]

urlpatterns = format_suffix_patterns(urlpatterns)