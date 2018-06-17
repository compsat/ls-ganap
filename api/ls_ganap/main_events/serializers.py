from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 
        		'start_time', 
        		'end_time', 
        		'name', 
        		'description', 
        		'is_accepted', 
        		'poster_url', 
        		'outside_venue_name', 
        		'is_premium', 
        		'event_url')