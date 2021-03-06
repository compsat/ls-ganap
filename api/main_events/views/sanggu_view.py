from main_events.models import SangguHost
from main_events.serializers.sanggu_serializer import SangguSerializer, SangguDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from main_events.swagger import SimpleFilterBackend    
from django.db.models import Q
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from main_events.jwt_authentication import MyJWTAuthentication
from main_events.permissions import IsOwnerOrReadOnly

class SangguList(APIView):
    """
    get: List all the sanggu hosts.
    """

    serializer_class = SangguSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def get(self, request, format=None):
        search = self.request.GET.get("search")
        queryset = SangguHost.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if search:
            queryset = queryset.filter(
                    Q(name__icontains=search) |
                    Q(abbreviation__icontains=search)
                )

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  SangguSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  SangguSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})

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
    authentication_classes = [MyJWTAuthentication,]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]