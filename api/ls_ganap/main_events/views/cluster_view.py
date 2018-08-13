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

class ClusterDetail(generics.RetrieveAPIView):
    """
    get: Returns a cluster given its id along with the orgs under it.
    """
    queryset = Cluster.objects.all()
    serializer_class = ClusterDetailSerializer
    pagination_class = ObjectPageNumberPagination
