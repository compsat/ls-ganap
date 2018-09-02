from main_events.models import Venue
from main_events.serializers import venue_serializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class VenueList(APIView):
    """
    get: List all the venues.
    post: Create a new venue.
    """
    serializer_class = venue_serializer.VenueSerializer

    def get(self, request, format=None):
        queryset = Venue.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  venue_serializer.VenueSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  venue_serializer.VenueSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})
    
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