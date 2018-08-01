from rest_framework import serializers, fields
from main_events.models import Event, Tag, Recurrence, WEEKDAYS

class EventSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)

    class Meta:
        model = Event
        fields = ['id', 
                'host', 
                'name', 
                'description',
                'venue',
                'start_time', 
                'end_time',
                'recurrence_bool',
                'is_accepted', 
                'poster_url', 
                'outside_venue_name', 
                'is_premium', 
                'event_url',
                'tags']

class EventDetailSerializer(serializers.ModelSerializer):
    datetimes = serializers.ListField(child=serializers.DateTimeField())
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)

    class Meta:
        model = Event
        fields = ['id', 
                'host', 
                'name', 
                'description',
                'venue',
                'start_time', 
                'end_time',
                'recurrence_bool',
                'datetimes',
                'is_accepted', 
                'poster_url', 
                'outside_venue_name', 
                'is_premium', 
                'event_url',
                'tags']

class RecurrenceSerializer(serializers.ModelSerializer):
    recur_days = fields.MultipleChoiceField(choices=WEEKDAYS)
    # datetimes = serializers.ListField(child=serializers.DateTimeField())
    event = EventDetailSerializer(required=True)

    class Meta:
        model = Recurrence
        fields = ['event',
                'freq',
                'repeats',
                'recur_days',
                'end_recur_date',
                'end_recur_times',
                'datetimes']
