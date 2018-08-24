from rest_framework import serializers
from main_events.models import SangguHost, Event
from main_events.serializers import event_serializer

class SangguSerializer(serializers.ModelSerializer):
    class Meta:
        model = SangguHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'color',
                 'logo_url',
                 'event_host']

class SangguDetailSerializer(serializers.ModelSerializer):
    event_list = event_serializer.EventSerializer(many=True, read_only=True)

    class Meta:
        model = SangguHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'color',
                 'logo_url',
                 'event_host',
                 'event_list']