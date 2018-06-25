from main_events.models import HostType
from main_events.serializers import HostTypeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class HostTypeList(generics.ListCreateAPIView):
    queryset = HostType.objects.all()
    serializer_class = HostTypeSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = HostTypeSerializer(queryset, many=True)
        return Response(serializer.data)
        
class HostTypeDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = HostType.objects.all()
	serializer_class = HostTypeSerializer