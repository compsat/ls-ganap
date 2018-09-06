from main_events.models import OrgType
from main_events.serializers import org_type_serializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class OrgTypeList(APIView):
    """
    get: List all the org types (COA and COP).
    """
    def get(self, request, format=None):
        queryset = OrgType.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  org_type_serializer.OrgTypeSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  org_type_serializer.OrgTypeSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})

class OrgTypeDetail(generics.RetrieveAPIView):
    """
    get: Returns a org type (COA and COP) given its id along with the orgs under it.
    """
    queryset = OrgType.objects.all()
    serializer_class = org_type_serializer.OrgTypeDetailSerializer
    pagination_class = ObjectPageNumberPagination
