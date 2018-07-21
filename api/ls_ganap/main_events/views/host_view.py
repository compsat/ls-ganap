from main_events.models import EventHost, Cluster, HostType
from main_events.serializers import HostSerializer, HostTypeDetailSerializer, ClusterDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class HostList(generics.ListAPIView):
    """
    get: List all the hosts.
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

class TypeHostList(generics.RetrieveAPIView):
    """
    get: Returns a host type given its id along with the hosts under it.
    """
    queryset = HostType.objects.all()
    serializer_class = HostTypeDetailSerializer
    pagination_class = ObjectPageNumberPagination

class ClusterOrgsList(generics.RetrieveAPIView):
    """
    get: Returns a cluster given its id along with the orgs under it.
    """
    queryset = Cluster.objects.all()
    serializer_class = ClusterDetailSerializer
    pagination_class = ObjectPageNumberPagination


class HostEventsList(generics.ListAPIView):
    """
    get: List all the events of a host given its id.
    """
    serializer_class = HostSerializer
    pagination_class = ObjectPageNumberPagination

    def get_queryset(self):
        host_id = self.kwargs['pk']
        queryset = Event.objects.all()
        
        if EventHost.objects.filter(pk=host_id).exists():
            queryset = queryset.filter(host_id=host_id)
        else:
            raise Http404

        return queryset