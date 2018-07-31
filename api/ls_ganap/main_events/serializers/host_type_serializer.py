from rest_framework import serializers
from main_events.models import HostType
from main_events.serializers import host_serializer

class HostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostType
        fields = ['id',
                  'type_name']

class HostTypeDetailSerializer(serializers.ModelSerializer):
    host_list = host_serializer.HostSerializer(many=True, read_only=True)

    class Meta:
        model = HostType
        fields = ['id',
                'type_name',
                'host_list']