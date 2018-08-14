from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_events.views import event_view, event_auth_view, cluster_view, host_view, org_type_view, tag_view, venue_view, user_view, org_view, sanggu_view, office_view
# import views

urlpatterns = [
    path('events/', event_view.EventList.as_view()),
    path('events/<int:pk>/', event_view.EventDetail.as_view()),
    path('events/logistics/<int:pk>/', event_view.EventLogisticCreate.as_view()),
    path('events/on/<str:date>', event_view.FilterEventByDate.as_view()),
    path('events/between/', event_view.FilterEventsBetweenDates.as_view()),
    path('events/week/<str:date>', event_view.FilterEventByWeek.as_view()),
    path('events/month/<str:date>', event_view.FilterEventByMonth.as_view()),
    path('events/google_api/<int:pk>/', event_auth_view.create_events, name='create_events'),
    path('event_hosts/', host_view.HostList.as_view()),
    path('event_hosts/<int:pk>/', host_view.HostDetail.as_view()),
    path('google_auth/', event_auth_view.authorize, name='authorize'),
    path('oauth2callback/', event_auth_view.oauth2callback, name='oauth2callback'),
    path('org/', org_view.OrgList.as_view()),
    path('org/<int:pk>/', org_view.OrgDetail.as_view()),
    path('office/', office_view.OfficeList.as_view()),
    path('office/<int:pk>/', office_view.OfficeDetail.as_view()),
    path('sanggu/', sanggu_view.SangguList.as_view()),
    path('sanggu/<int:pk>', sanggu_view.SangguDetail.as_view()),
    path('org_types/', org_type_view.OrgTypeList.as_view()),
    path('org_types/<int:pk>/', org_type_view.OrgTypeDetail.as_view()),
    path('tags/', tag_view.TagList.as_view()),
    path('tags/<int:pk>/', tag_view.TagDetail.as_view()),
    path('clusters/', cluster_view.ClusterList.as_view()),
    path('clusters/<int:pk>', cluster_view.ClusterDetail.as_view()),
    path('venues/', venue_view.VenueList.as_view()),
    path('venues/<int:pk>/', venue_view.VenueDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)