from main_events.models import Tag
from main_events.serializers import TagSerializer, TagDetailSerializer
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

class TagDetail(generics.RetrieveAPIView):
    """
    get: Returns a tag given its id along with the events associated with it.
    """
    queryset = Tag.objects.all()
    serializer_class = TagDetailSerializer
    pagination_class = ObjectPageNumberPagination
