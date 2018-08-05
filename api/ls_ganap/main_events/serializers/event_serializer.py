from rest_framework import serializers, fields
from multiselectfield import MultiSelectField
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

class RecurrenceSerializer(serializers.ModelSerializer):
    recur_days = fields.MultipleChoiceField(choices=WEEKDAYS)
    event = EventSerializer(read_only=True)
    datetimes = serializers.ListField(child=serializers.DateField())

    class Meta:
        model = Recurrence
        fields = ['event',
                'freq',
                'repeats',
                'recur_days',
                'end_recur_date',
                'end_recur_times',
                'datetimes']

class RecurrenceWithoutEventSerializer(serializers.ModelSerializer):
    recur_days = fields.MultipleChoiceField(choices=WEEKDAYS)
    datetimes = serializers.ListField(child=serializers.DateField())

    class Meta:
        model = Recurrence
        fields = ['freq',
                'repeats',
                'recur_days',
                'end_recur_date',
                'end_recur_times',
                'datetimes']

class EventDetailSerializer(serializers.ModelSerializer):
    # datetimes = serializers.ListField(child=serializers.DateTimeField())
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    recurrence = RecurrenceWithoutEventSerializer(read_only=True)

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
                # 'datetimes',
                'is_accepted', 
                'poster_url', 
                'outside_venue_name', 
                'is_premium', 
                'event_url',
                'tags',
                'recurrence']

# class EventWithRecurrenceSerializer(serializers.ModelSerializer):
#     recur_days = fields.MultipleChoiceField(choices=WEEKDAYS)
#     # datetimes = serializers.ListField(child=serializers.DateTimeField())
#     recurrence = RecurrenceSerializer(read_only=True)

#     class Meta:
#         model = Event
#         fields = ['id', 
#                 'host', 
#                 'name', 
#                 'description',
#                 'venue',
#                 'start_time', 
#                 'end_time',
#                 'recurrence_bool',
#                 'is_accepted', 
#                 'poster_url', 
#                 'outside_venue_name', 
#                 'is_premium', 
#                 'event_url',
#                 'tags',
#                 'recurrence']