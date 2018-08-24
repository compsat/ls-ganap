from rest_framework import serializers
from main_events.models import OrgHost, Event
from main_events.serializers import event_serializer

class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'color',
                 'logo_url',
                 'event_host',
                 'org_type',
                 'cluster']

class OrgDetailSerializer(serializers.ModelSerializer):
    event_list = event_serializer.EventSerializer(many=True, read_only=True)

    class Meta:
        model = OrgHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'color',
                 'logo_url',
                 'event_host',
                 'org_type',
                 'cluster',
                 'event_list']