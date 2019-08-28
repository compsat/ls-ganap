from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from main_events.views import audience_view, event_view, event_auth_view, cluster_view, host_view, org_type_view, tag_view, venue_view, user_view, org_view, sanggu_view, office_view

urlpatterns = [
    path('audiences/', audience_view.AudienceList.as_view(), name='audience-list'),
    path('events/', event_view.EventList.as_view(), name='event-list'),
    path('events/<int:pk>/', event_view.EventDetail.as_view()),
    path('events/logistics/<int:pk>/', event_view.EventLogisticCreate.as_view()),
    path('events/orgs/<int:pk>/', event_view.FilterEventByOrg.as_view()),
    path('events/offices/<int:pk>/', event_view.FilterEventByOffice.as_view()),
    path('events/sanggu/<int:pk>/', event_view.FilterEventBySanggu.as_view()),
    path('events/on/<str:date>/', event_view.FilterEventByDate.as_view()),
    path('events/between/', event_view.FilterEventsBetweenDates.as_view()),
    path('events/week/<str:date>/', event_view.FilterEventByWeek.as_view()),
    path('events/month/<str:date>/', event_view.FilterEventByMonth.as_view()),
    path('events/featured/', event_view.FeaturedEventList.as_view()),
    path('events/unapproved/', event_view.UnapprovedEventList.as_view()),
    path('event_hosts/', host_view.HostList.as_view(), name='host-list'),
    path('event_hosts/<int:pk>/', host_view.HostDetail.as_view()),
    # path('gcal/add_orgs/', event_auth_view.add_calendars, name='add_calendars'),
    # path('gcal/get_org/', event_auth_view.get_calendar, name='get_calendar'),
    # path('gcal/del_org/', event_auth_view.del_calendars, name='del_calendars'),
    # path('gcal/<str:host_type>/<int:pk>/', event_auth_view.sync_host, name='sync_host'),
    path('gcal/events/<int:pk>/', event_auth_view.create_events, name='create_events'),
    path('gcal/add_calendar/<int:pk>/', event_auth_view.add_calendar_to_list, name='add_calendar_to_list'),
    path('google_auth/', event_auth_view.authorize, name='authorize_google'),
    path('oauth2callback/', event_auth_view.oauth2callback, name='oauth2callback'),
    path('orgs/', org_view.OrgList.as_view(), name='org-list'),
    path('orgs/<int:pk>/', org_view.OrgDetail.as_view()),
    path('offices/', office_view.OfficeList.as_view(), name='office-list'),
    path('offices/<int:pk>/', office_view.OfficeDetail.as_view()),
    path('sanggu/', sanggu_view.SangguList.as_view(), name='sanggu-list'),
    path('sanggu/<int:pk>/', sanggu_view.SangguDetail.as_view()),
    path('org_types/', org_type_view.OrgTypeList.as_view(), name='org-type-list'),
    path('org_types/<int:pk>/', org_type_view.OrgTypeDetail.as_view()),
    path('tags/', tag_view.TagList.as_view(), name='tag-list'),
    path('tags/<int:pk>/', tag_view.TagDetail.as_view()),
    path('clusters/', cluster_view.ClusterList.as_view(), name='cluster-list'),
    path('clusters/<int:pk>/', cluster_view.ClusterDetail.as_view()),
    path('venues/', venue_view.VenueList.as_view(), name='venue-list'),
    path('venues/<int:pk>/', venue_view.VenueDetail.as_view()),
    path('user/password_reset/', user_view.UpdatePassword.as_view()),
    path('oauth/login/', user_view.SocialLoginView.as_view(), name='social-login')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
