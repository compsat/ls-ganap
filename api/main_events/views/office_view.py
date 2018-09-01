from main_events.models import OfficeHost
from main_events.serializers.office_serializer import OfficeSerializer, OfficeDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from main_events.swagger import SimpleFilterBackend     


class OfficeList(generics.ListAPIView):
    """
    get: List all the office hosts.
    """
    queryset = OfficeHost.objects.all()
    serializer_class = OfficeSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination
    filter_backends = [SearchFilter, OrderingFilter, SimpleFilterBackend]
    search_fields = ['name', 'abbreviation']

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = OfficeSerializer(queryset, many=True)
        return Response(serializer.data)

class OfficeDetail(generics.RetrieveUpdateAPIView):
    """
    get: 
    Returns an office host given its id along with all its events.
    
    put:
    Updates an office host given its id.

    patch:
    Updates an office host given its id.
    """
    queryset = OfficeHost.objects.all()
    serializer_class = OfficeDetailSerializer