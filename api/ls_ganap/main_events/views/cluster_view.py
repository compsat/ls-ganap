from main_events.models import Cluster, EventHost
from main_events.serializers import ClusterSerializer, HostSerializer
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

class ClusterDetail(APIView):
    """
    get: Returns a cluster given its id
    """
    def get_object(self, pk):
        try:
            return Cluster.objects.get(pk=pk)
        except Cluster.DoesNotExist:
            raise Http404
 
    def get(self, request, pk, format=None):
        cluster = self.get_object(pk)
        serializer = ClusterSerializer(cluster)
        return Response(serializer.data)

class ClusterOrgsList(generics.ListAPIView):
    """
    get: List all the orgs under a cluster given its id.
    """
    serializer_class = HostSerializer
    pagination_class = ObjectPageNumberPagination

    def get_queryset(self):
        cluster_id = self.kwargs['pk']
        queryset = EventHost.objects.all()
        
        if Cluster.objects.filter(pk=cluster_id).exists():
            queryset = queryset.filter(cluster=cluster_id)
        else:
            raise Http404

        return queryset