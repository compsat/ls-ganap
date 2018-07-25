from rest_framework import serializers
from main_events.models import EventHost, Event
from main_events.serializers import event_serializer

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventHost
        fields = ['id',
                 'name',
                 'host_type',
                 'cluster',
                 'abbreviation',
                 'description',
                 'accredited',
                 'color',
                 'logo_url']

class HostDetailSerializer(serializers.ModelSerializer):
    hosted_events = event_serializer.EventSerializer(many=True, read_only=True)

    class Meta:
        model = EventHost
        fields = ['id',
                 'name',
                 'host_type',
                 'cluster',
                 'abbreviation',
                 'description',
                 'accredited',
                 'color',
                 'logo_url',
                 'hosted_events']