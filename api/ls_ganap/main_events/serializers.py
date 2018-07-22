from rest_framework import serializers
from .models import Cluster, Event, EventHost, HostType, Tag, Venue
from django.contrib.auth.models import User

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

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id',
                  'name']

class TagDetailSerializer(serializers.ModelSerializer):
    event_list = EventSerializer(many=True, read_only=True)

    class Meta:
        model = Tag
        fields = ['id',
                  'name', 
                  'event_list']

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
    hosted_events = EventSerializer(many=True, read_only=True)

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

class ClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cluster
        fields = ['id',
                'name', 
                'description', 
                'logo_url']

class ClusterDetailSerializer(serializers.ModelSerializer):
    org_list = HostSerializer(many=True, read_only=True)

    class Meta:
        model = Cluster
        fields = ['id',
                'name', 
                'description', 
                'logo_url',
                'org_list']
        
class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['id',
                  'name']

class HostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostType
        fields = ['id',
                  'type_name']

class HostTypeDetailSerializer(serializers.ModelSerializer):
    host_list = HostSerializer(many=True, read_only=True)

    class Meta:
        model = HostType
        fields = ['id',
                'type_name',
                'host_list']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = '__all__'
