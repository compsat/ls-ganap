from main_events.models import Tag
from main_events.serializers import TagSerializer, TagDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
from main_events.jwt_authentication import MyJWTAuthentication
from rest_framework.filters import SearchFilter

class TagList(APIView):
    """
    get: List all the tags.
    """
    serializer_class = TagSerializer
    authentication_classes = [MyJWTAuthentication,]
    filter_backends = [SearchFilter]
    # specifies which pagination settings to follow

    def get(self, request, format=None):
        queryset = Tag.objects.all()
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()

        search = self.request.GET.get("search")
        
        if search:
            queryset = queryset.filter(name__icontains=search).distinct()

        if request.method == 'GET' and 'page' in request.GET:

            page = paginator.paginate_queryset(queryset, request)
            serializer =  TagSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer =  TagSerializer(queryset, many=True)
            
            return Response({"results" : serializer.data})

    def post(self, request, format=None):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagDetail(generics.RetrieveAPIView):
    """
    get: Returns a tag given its id along with the events associated with it.
    """
    queryset = Tag.objects.all()
    serializer_class = TagDetailSerializer
    pagination_class = ObjectPageNumberPagination
