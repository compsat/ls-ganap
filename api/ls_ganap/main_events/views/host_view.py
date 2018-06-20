from main_events.models import EventHost
from main_events.serializers import HostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class HostList(generics.ListCreateAPIView):
    queryset = EventHost.objects.all()
    serializer_class = HostSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = HostSerializer(queryset, many=True)
        return Response(serializer.data)

class HostDetail(APIView):
    def get_object(self, pk):
        try:
            return EventHost.objects.get(pk=pk)
        except EventHost.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        host = self.get_object(pk)
        serializer = HostSerializer(host)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        host = self.get_object(pk)
        serializer = HostSerializer(host, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        host = self.get_object(pk)
        host.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)