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
from django.http import Http404
from datetime import datetime, timedelta


class FilterEventsBetweenDates(generics.ListAPIView):
    serializer_class = EventSerializer
    pagination_class = ObjectPageNumberPagination
    """
    sample usage http://localhost:8000/api/get_events_between/?start_date=2018-06-25&end_date=2018-07-03
    Note: range does not include the last element need to add 
    """
    def get_queryset(self):
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)

        queryset = Event.objects.all()

        if(start_date is not None) and (end_date is not None):
           queryset = queryset.filter(start_time__range=[start_date, end_date])
        else:
            raise Http404

        return queryset

class FilterEventByDate(generics.ListAPIView):
    serializer_class = EventSerializer
    pagination_class = ObjectPageNumberPagination

    def get_queryset(self):
        date = self.kwargs['date']
        queryset = Event.objects.all()
        
        if date is not None:
            queryset = queryset.filter(start_time__date=date)

        return queryset



class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    # overwrite get_queryset() method
    def get_queryset(self, *args, **kwargs):
        queryset_list = Event.objects.all()
        query = self.request.GET.get("q")
        
        # only perform the filtering if the query has arguements
        # if not return all the events
        if query:
            queryset_list = queryset_list.filter(
                Q(name__icontains=query)|
                Q(venue_id__name__icontains=query)|
                Q(host_id___name__icontains=query)
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