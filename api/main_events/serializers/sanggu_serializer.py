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
    event_list = serializers.SerializerMethodField("get_approved_events")

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

    def get_approved_events(self, obj):
        return event_serializer.EventSerializer(obj.event_list.filter(is_approved=True), many=True).data