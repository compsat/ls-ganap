from rest_framework import serializers
from main_events.models import Cluster
from main_events.serializers import host_serializer

class ClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cluster
        fields = ['id',
                'name', 
                'description', 
                'logo_url']

class ClusterDetailSerializer(serializers.ModelSerializer):
    org_list = host_serializer.HostSerializer(many=True, read_only=True)

    class Meta:
        model = Cluster
        fields = ['id',
                'name', 
                'description', 
                'logo_url',
                'org_list']