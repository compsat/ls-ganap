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


class OfficeList(APIView):
    """
    get: List all the office hosts.
    """
    serializer_class = OfficeSerializer

    def get(self, request, format=None):
        queryset = OfficeHost.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  OfficeSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  OfficeSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})

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