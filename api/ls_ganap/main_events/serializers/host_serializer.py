from rest_framework import serializers
from main_events.models import EventHost, Event
from main_events.serializers import org_serializer, sanggu_serializer, office_serializer

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventHost
        fields = ['id',
                 'name']

class HostDetailSerializer(serializers.ModelSerializer):
    sanggu_list = sanggu_serializer.SangguSerializer(many=True, read_only=True)
    office_list = office_serializer.OfficeSerializer(many=True, read_only=True)
    org_list = org_serializer.OrgSerializer(many=True, read_only=True)

    class Meta:
        model = EventHost
        fields = ['id',
                 'name',
                 'sanggu_list',
                 'office_list',
                 'org_list']