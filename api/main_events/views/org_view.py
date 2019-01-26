from main_events.models import OrgHost
from main_events.serializers.org_serializer import OrgSerializer, OrgDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q  
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from main_events.jwt_authentication import MyJWTAuthentication
from main_events.permissions import IsOwnerOrReadOnly

class OrgList(APIView):
    """
    get: List all the org hosts.
    """
    serializer_class = OrgSerializer

    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination
    
    def get(self, request, format=None):
        search = self.request.GET.get("search")
        queryset = OrgHost.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if search:
            queryset = queryset.filter(
                    Q(name__icontains=search) |
                    Q(abbreviation__icontains=search)
                )

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  OrgSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  OrgSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})

class OrgDetail(generics.RetrieveUpdateAPIView):
    """
    get: 
    Returns an org host given its id along with all its events.
    
    put:
    Updates an org host given its id.

    patch:
    Updates an org host given its id.
    """
    queryset = OrgHost.objects.all()
    serializer_class = OrgDetailSerializer
    authentication_classes = [MyJWTAuthentication,]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]