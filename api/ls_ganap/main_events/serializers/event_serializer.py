from rest_framework import serializers, fields
from main_events.models import Event, Tag, WEEKDAYS
#from main_events.serializers.recurrence_serializer import RuleSerializer

class EventSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    # recurrence = RuleSerializer
    recur_days = fields.MultipleChoiceField(choices=WEEKDAYS)

    class Meta:
        model = Event
        fields = ['id', 
                'host', 
                'name', 
                'description',
                'venue',
                'start_time', 
                'end_time',
                'freq',
                'repeats',
                'recur_days',
                'end_recur_date',
                'end_recur_times',
                'is_accepted', 
                'poster_url', 
                'outside_venue_name', 
                'is_premium', 
                'event_url',
                'tags']
