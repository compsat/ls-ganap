from main_events.models import OrgType
from main_events.serializers import org_type_serializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class OrgTypeList(generics.ListAPIView):
    """
    get: List all the org types (COA and COP).
    """
    queryset = OrgType.objects.all()
    serializer_class = org_type_serializer.OrgTypeSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = OrgTypeSerializer(queryset, many=True)
        return Response(serializer.data)

class OrgTypeDetail(generics.RetrieveAPIView):
    """
    get: Returns a org type (COA and COP) given its id along with the orgs under it.
    """
    queryset = OrgType.objects.all()
    serializer_class = org_type_serializer.OrgTypeDetailSerializer
    pagination_class = ObjectPageNumberPagination
