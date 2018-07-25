from rest_framework import serializers
from main_events.models import Event, Tag

class EventSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)

    class Meta:
        model = Event
        fields = ['id', 
                'start_time', 
                'end_time',
                'venue', 
                'host',
                'name', 
                'description', 
                'is_accepted', 
                'poster_url', 
                'outside_venue_name', 
                'is_premium', 
                'event_url',
                'tags']
