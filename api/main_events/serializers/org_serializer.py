from rest_framework import serializers
from main_events.models import OrgHost, Event
from main_events.serializers import event_serializer

class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'color',
                 'logo_url',
                 'event_host',
                 'org_type',
                 'cluster']

class OrgDetailSerializer(serializers.ModelSerializer):
    # event_list = event_serializer.EventSerializer(many=True, read_only=True)
    event_list = serializers.SerializerMethodField("get_approved_events")

    class Meta:
        model = OrgHost
        fields = ['id',
                 'name',
                 'abbreviation',
                 'description',
                 'color',
                 'logo_url',
                 'event_host',
                 'org_type',
                 'cluster',
                 'event_list']

    def get_approved_events(self, obj):
        return event_serializer.EventSerializer(obj.event_list.filter(is_approved=True), many=True).data