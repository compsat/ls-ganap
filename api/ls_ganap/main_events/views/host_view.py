from main_events.models import EventHost, Event
from main_events.serializers import HostSerializer, EventSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class HostList(generics.ListCreateAPIView):
    """
    get: List all the hosts.
    post: Create a new host.
    """
    queryset = EventHost.objects.all()
    serializer_class = HostSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = HostSerializer(queryset, many=True)
        return Response(serializer.data)

class HostDetail(generics.RetrieveUpdateAPIView):
    """
    get: 
    Returns a host given its id
    
    put:
    Updates a host given its id

    patch:
    Updates a host given its id
    """
    queryset = EventHost.objects.all()
    serializer_class = HostSerializer

class HostEventsList(generics.ListAPIView):
    """
    get: List all the events of a host given its id.
    """
    serializer_class = EventSerializer
    pagination_class = ObjectPageNumberPagination

    def get_queryset(self):
        host_id = self.kwargs['pk']
        queryset = Event.objects.all()
        
        if EventHost.objects.filter(pk=host_id).exists():
            queryset = queryset.filter(host_id=host_id)
        else:
            raise Http404

        return queryset