from rest_framework import serializers
from main_events.models import Event, EventLogistic, Tag, Venue

class EventLogisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLogistic
        fields = ['date',
                'start_time', 
                'end_time',
                'venue']

class EventLogisticSaveSerializer(serializers.ModelSerializer):
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

# class CreateEventSerializer(serializers.ModelSerializer):

#     tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
#     event_logistics = EventLogisticSerializer()

#     class Meta:
#         model = Event

#         fields = ['id', 
#                 'host',
#                 'name', 
#                 'description', 
#                 'poster_url', 
#                 'outside_venue_name',
#                 'event_url',
#                 'tags',
#                 'event_logistics']

#     def create(self, validated_data):
#         event_log_data = validated_data.pop('event_logistics')
#         tags_data = validated_data.pop('tags')
        

#        print(validated_data) 
#         # event = Event.objects.create(**validated_data)
#         # print(event)
        
#         # event_log = EventLogistic.objects.create(event_log_data)
#         # print(event_log)

#         # event.event_logistics.add(event_log)
#         # # logistic = EventLogistic.objects.create(event=event, **event_log_data)
#         # # print(logistic)

#         # for tag in tags_data:
#         #     event.tags.add(tag)

#         return validated_data



class CreateEventSerializer(serializers.ModelSerializer):

    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    venue = serializers.PrimaryKeyRelatedField(queryset=Venue.objects.all())

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
                'date',
                'start_time',
                'end_time',
                'venue']

    def create(self, validated_data):

        host = validated_data['host']
        name = validated_data['name']
        description = validated_data['description']
        poster_url = validated_data['poster_url']
        outside_venue_name = validated_data['outside_venue_name']
        event_url = validated_data['event_url']
        tags = validated_data['tags']
        
        # event_logistic
        date = validated_data['date']
        start_time = validated_data['start_time']
        end_time = validated_data['end_time']
        venue = validated_data['venue']

        # save the event object
        event_obj = Event(
            host=host,
            name=name,
            description=description,
            poster_url=poster_url,
            outside_venue_name=outside_venue_name,
            event_url=event_url
        )


        event_obj.save()

        # loop through each selected tag and add to the event obj
        for tag in tags:
            event_obj.tags.add(tag)


        # create the event logistic object
        event_log = EventLogistic(
            date=date,
            start_time=start_time,
            end_time=end_time,
            venue=venue,
            event=event_obj
        )

        print(event_obj.poster_url.url)

        # doesn't seem to update
        validated_data['poster_url'] = event_obj.poster_url.url
        # save the event log object
        event_log.save()

        # add the logistic to the event
        event_obj.event_logistics.add(event_log)

        return validated_data    




