from main_events.models import Venue
from main_events.serializers import venue_serializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class VenueList(generics.ListCreateAPIView):
    """
    get: List all the venues.
    post: Create a new venue.
    """
    queryset = Venue.objects.all()
    serializer_class = venue_serializer.VenueSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = VenueSerializer(queryset, many=True)
        return Response(serializer.data)
        
class VenueDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get: 
    Returns a venue given its id
    
    put:
    Updates a venue given its id

    patch:
    Updates a venue given its id

    delete:
    Deletes a venue given its id
    """
    queryset = Venue.objects.all()
    serializer_class = venue_serializer.VenueSerializer