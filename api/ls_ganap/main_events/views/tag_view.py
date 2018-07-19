from main_events.models import Tag, Event
from main_events.serializers import TagSerializer, EventSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class TagList(generics.ListCreateAPIView):
    """
    get: List all the tags.
    post: Create a new tag.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    # specifies which pagination settings to follow
    pagination_class = ObjectPageNumberPagination

    def list_items(self, request):
        queryset = self.get_queryset()
        serializer = TagSerializer(queryset, many=True)
        return Response(serializer.data)
        
class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get: 
    Returns a tag given its id
    
    put:
    Updates a tag given its id

    patch:
    Updates a tag given its id

    delete:
    Deletes a tag given its id
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagEventsList(generics.ListAPIView):
    """
    get: List all the events with a tag given its id.
    """
    serializer_class = EventSerializer
    pagination_class = ObjectPageNumberPagination

    def get_queryset(self):
        tag_id = self.kwargs['pk']
        queryset = Event.objects.all()
        
        if Tag.objects.filter(pk=tag_id).exists():
            queryset = queryset.filter(tags=tag_id)
        else:
            raise Http404

        return queryset