from rest_framework import serializers
from .models import Event, EventHost, HostType, Tag, Venue

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 
        		'start_time', 
        		'end_time',
        		'venue_id', 
        		'host_id',
        		'name', 
        		'description', 
        		'is_accepted', 
        		'poster_url', 
        		'outside_venue_name', 
        		'is_premium', 
        		'event_url']

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventHost
        fields = ['name',
        		 'host_type',
        		 'description',
        		 'color',
        		 'logo_url']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        # fields = '__all__'
        fields = ['name']
        
class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['name']

class HostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostType
        fields = ['host_type']
