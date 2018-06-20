from main_events.models import EventHost
from main_events.serializers import HostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HostList(APIView):
    def get(self, request, format=None):
        hosts = EventHost.objects.all()
        serializer = HostSerializer(hosts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = HostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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