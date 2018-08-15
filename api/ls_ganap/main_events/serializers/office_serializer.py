from rest_framework import serializers
from main_events.models import OfficeHost, Event
from main_events.serializers import event_serializer

class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'accredited',
                 'color',
                 'logo_url',
                 'event_host']

class OfficeDetailSerializer(serializers.ModelSerializer):
    event_list = event_serializer.EventSerializer(many=True, read_only=True)

    class Meta:
        model = OfficeHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'accredited',
                 'color',
                 'logo_url',
                 'event_host',
                 'event_list']