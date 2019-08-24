from rest_framework import serializers
from main_events.models import Event, EventLogistic, Tag, SangguHost, OfficeHost, OrgHost, Venue
from datetime import datetime
import time

class EventLogisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLogistic
        fields = ['date',
                'start_time', 
                'end_time',
                'venue',
                'outside_venue_name']

class EventLogisticSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLogistic
        fields = ['event',
                'date',
                'start_time', 
                'end_time',
                'venue',
                'outside_venue_name']

class EventSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    event_logistics = EventLogisticSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ['id', 
                'name',
                'created_by',
                'sanggu_hosts',
                'office_hosts',
                'org_hosts', 
                'description', 
                'poster_url', 
                'event_url',
                'tags',
                'audience',
                'event_logistics']

class CreateEventSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    event_logistics = serializers.ListField(
       child=serializers.DictField(
            child=serializers.CharField(required=False)
        ),
       required=False, write_only=True
    )
    hosts = serializers.ListField(
       child=serializers.IntegerField(),
       required=False, write_only=True
    )

    def validate_hosts(self, hosts):
        for host in hosts:
            if not OrgHost.objects.filter(pk=host).exists() and not SangguHost.objects.filter(pk=host).exists() and not OfficeHost.objects.filter(pk=host).exists():
                raise serializers.ValidationError("Host with index {} does not exist".format(host))

        return hosts

    def validate_event_logistics(self, logistics):
        for logistic in logistics:
            try:
                datetime.strptime(logistic['date'], "%Y-%m-%d")
            except ValueError:
                raise serializers.ValidationError("Date is not valid")

            try:
                time.strptime(logistic['start_time'], "%H:%M:%S")
            except ValueError:
                raise serializers.ValidationError("Start time is not valid")

            try:
                time.strptime(logistic['end_time'], "%H:%M:%S")
            except ValueError:
                raise serializers.ValidationError("End time is not valid")
                
            if 'venue' in logistic and not Venue.objects.filter(pk=int(logistic['venue'])).exists():
                raise serializers.ValidationError("Venue does not exist")

        return logistics
                
    def create(self, validated_data):
        return save_event(validated_data, None)
                
    def update(self, instance, validated_data):
        return save_event(validated_data, instance)

    class Meta:
        model = Event
        fields = ['id', 
                'name',
                'hosts',
                'sanggu_hosts',
                'office_hosts',
                'org_hosts',
                'description', 
                'poster_url', 
                'event_url',
                'tags',
                'audience',
                'event_logistics']

def save_event(validated_data, instance):
    hosts_data = None

    if 'hosts' in validated_data:
        hosts_data = validated_data.pop('hosts', None)

    event_logistics = validated_data.pop('event_logistics', None)

    tags_data = validated_data.pop('tags', None)
    if instance:
        for attr, value in validated_data.items(): 
            setattr(instance, attr, value)
        instance.save()

        event = instance
    else:
        event = Event.objects.create(**validated_data)

    creator = event.created_by

    if tags_data:
        event.tags.set(tags_data)

    if event_logistics:

        logistics = EventLogistic.objects.filter(event=event)

        if logistics.exists():
            logistics.delete()

        add_event_logistics(event_logistics, event)

    if hosts_data:
        for host in hosts_data:
            if OrgHost.objects.filter(pk=host).exists():
                event.org_hosts.add(OrgHost.objects.get(pk=host))
            elif SangguHost.objects.filter(pk=host).exists():
                event.sanggu_hosts.add(SangguHost.objects.get(pk=host))
            elif OfficeHost.objects.filter(pk=host).exists():
                event.office_hosts.add(OfficeHost.objects.get(pk=host))

    # automatically adds creator to list of hosts if it's not part
    if OrgHost.objects.filter(pk=creator).exists():
        org_host = OrgHost.objects.get(pk=creator)
        if org_host not in event.org_hosts.all():
            event.org_hosts.add(org_host)

    elif SangguHost.objects.filter(pk=creator).exists():
        sanggu_host = SangguHost.objects.get(pk=creator)
        if sanggu_host not in event.sanggu_hosts.all():
            event.sanggu_hosts.add(sanggu_host)
            
    elif OfficeHost.objects.filter(pk=creator).exists():
        office_host = OfficeHost.objects.get(pk=creator)
        if office_host not in event.office_hosts.all():
            event.office_hosts.add(office_host)

    event.save()
    return event

def add_event_logistics(event_logistics, event):
    for logistic in event_logistics:
        date = logistic['date']
        start_time = logistic['start_time']
        end_time = logistic['end_time']

        if 'venue' in logistic and logistic['venue']:
            venue = logistic['venue']
            logistic = event.event_logistics.create(date=date, start_time=start_time, end_time=end_time, venue=Venue.objects.get(pk=int(venue)))

        else:
            outside_venue_name = logistic['outside_venue_name']
            logistic = event.event_logistics.create(date=date, start_time=start_time, end_time=end_time, outside_venue_name=outside_venue_name)