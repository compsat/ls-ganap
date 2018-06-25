from main_events.models import Venue
from main_events.serializers import VenueSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class VenueList(generics.ListCreateAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = VenueSerializer(queryset, many=True)
        return Response(serializer.data)
        
class VenueDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Venue.objects.all()
	serializer_class = VenueSerializer