from main_events.models import Cluster, EventHost
from main_events.serializers import ClusterSerializer, ClusterDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class ClusterList(APIView):
    """
    get: List all the clusters.
    post: Create a new cluster.
    """
    serializer_class = ClusterSerializer

    def get(self, request, format=None):
        hosts = Cluster.objects.all()
        serializer = ClusterSerializer(hosts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ClusterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClusterDetail(generics.RetrieveAPIView):
    """
    get: Returns a cluster given its id along with the orgs under it.
    """
    queryset = Cluster.objects.all()
    serializer_class = ClusterDetailSerializer
    pagination_class = ObjectPageNumberPagination
