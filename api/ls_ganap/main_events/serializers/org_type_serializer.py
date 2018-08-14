from rest_framework import serializers
from main_events.models import OrgType
from main_events.serializers import org_serializer

class OrgTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgType
        fields = ['id',
                  'name']

class OrgTypeDetailSerializer(serializers.ModelSerializer):
    org_list = org_serializer.OrgSerializer(many=True, read_only=True)

    class Meta:
        model = OrgType
        fields = ['id',
                'name',
                'org_list']