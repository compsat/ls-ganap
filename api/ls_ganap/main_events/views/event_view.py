from main_events.models import Event
from main_events.serializers import EventSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
# import Query lookups
from django.db.models import Q
from rest_framework.filters import SearchFilter, OrderingFilter

class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination
    serializer_class = EventSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'venue_id__name', 'host_id__name']

    # overwrite get_queryset() method
    def get_queryset(self, *args, **kwargs):
        queryset_list = Event.objects.all()
        query = self.request.GET.get("host_type_id")
        
        # only perform the filtering if the query has arguements
        # if not return all the events
        if query:
            queryset_list = queryset_list.filter(
                Q(host_id__host_type__id__contains=query)
            ).distinct()

        return queryset_list


    def list_items(self, request):
        # make sure to filter by event start_time
        queryset = self.get_queryset().order_by('start_time')
        
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Event.objects.all()
	serializer_class = EventSerializer