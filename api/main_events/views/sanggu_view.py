from main_events.models import SangguHost
from main_events.serializers.sanggu_serializer import SangguSerializer, SangguDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from main_events.swagger import SimpleFilterBackend     


class SangguList(generics.ListAPIView):
    """
    get: List all the sanggu hosts.
    """
    queryset = SangguHost.objects.all()
    serializer_class = SangguSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination
    filter_backends = [SearchFilter, OrderingFilter, SimpleFilterBackend]
    search_fields = ['name', 'abbreviation']

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = SangguSerializer(queryset, many=True)
        return Response(serializer.data)

class SangguDetail(generics.RetrieveUpdateAPIView):
    """
    get: 
    Returns an sanggu host given its id along with all its events.
    
    put:
    Updates an sanggu host given its id.

    patch:
    Updates an sanggu host given its id.
    """
    queryset = SangguHost.objects.all()
    serializer_class = SangguDetailSerializer