from rest_framework import serializers
from main_events.serializers import event_serializer
from main_events.models import Tag
from django.core.exceptions import ValidationError

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id',
                  'name']

    def validate(self, data):
        name = data['name']

        if not name:
          raise Validation('A tag is not given.')

        tag = Tag.objects.filter(name__iexact=name).distinct()

        if tag.exists():
          raise ValidationError('This tag already exists.')

        return data

class TagDetailSerializer(serializers.ModelSerializer):
    event_list = event_serializer.EventSerializer(many=True, read_only=True)

    class Meta:
        model = Tag
        fields = ['id',
                  'name', 
                  'event_list']