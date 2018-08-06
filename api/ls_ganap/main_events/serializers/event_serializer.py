from rest_framework import serializers
from main_events.models import Event, EventLogistic, Tag

class EventLogisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLogistic
        fields = ['event',
                'date',
                'start_time', 
                'end_time',
                'venue']

class EventSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    event_logistics = EventLogisticSerializer(many=True)

    class Meta:
        model = Event
        fields = ['id', 
                'host',
                'name', 
                'description', 
                'poster_url', 
                'outside_venue_name',
                'event_url',
                'tags',
                'event_logistics']