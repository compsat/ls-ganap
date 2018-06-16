from rest_framework import serializers
from main_events.models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'start_time', 'end_time', 'name', 'description', 'created_at', 'updated_at', 'is_accepted', 'poster_url', 'outside_venue_name', 'is_premium', 'event_url')