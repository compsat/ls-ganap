from rest_framework import serializers
from main_events.serializers import event_serializer
from main_events.models import Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id',
                  'name']

class TagDetailSerializer(serializers.ModelSerializer):
    event_list = event_serializer.EventSerializer(many=True, read_only=True)

    class Meta:
        model = Tag
        fields = ['id',
                  'name', 
                  'event_list']