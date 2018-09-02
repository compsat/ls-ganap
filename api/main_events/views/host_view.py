from main_events.models import EventHost
from main_events.serializers.host_serializer import HostSerializer, HostDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class HostList(APIView):
    """
    get: List all the hosts (LS, GS, HS).
    """
    serializer_class = HostSerializer


    def get(self, request, format=None):
        queryset = EventHost.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  HostSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer = HostSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})

class HostDetail(generics.RetrieveAPIView):
    """
    get: 
    Returns a host (LS, GS, HS) given its id along with all its lower-level hosts (Sanggu, Org, Office).
    """
    queryset = EventHost.objects.all()
    serializer_class = HostDetailSerializer