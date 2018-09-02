from main_events.models import Tag
from main_events.serializers import TagSerializer, TagDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status


class TagList(APIView):
    """
    get: List all the tags.
    """
    serializer_class = TagSerializer
    # specifies which pagination settings to follow

    def get(self, request, format=None):
        queryset = Tag.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  TagSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  TagSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})


class TagDetail(generics.RetrieveAPIView):
    """
    get: Returns a tag given its id along with the events associated with it.
    """
    queryset = Tag.objects.all()
    serializer_class = TagDetailSerializer
    pagination_class = ObjectPageNumberPagination
