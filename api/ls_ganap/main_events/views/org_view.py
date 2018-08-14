from main_events.models import OrgHost
from main_events.serializers.org_serializer import OrgSerializer, OrgDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class OrgList(generics.ListAPIView):
    """
    get: List all the org hosts.
    """
    queryset = OrgHost.objects.all()
    serializer_class = OrgSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = OrgSerializer(queryset, many=True)
        return Response(serializer.data)

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