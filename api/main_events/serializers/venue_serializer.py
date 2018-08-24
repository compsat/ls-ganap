from rest_framework import serializers
from main_events.models import Venue

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['id',
                  'name']
