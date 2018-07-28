from django.contrib.auth import get_user_model
from main_events.serializers import user_serializer
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny
from main_events.serializers import user_serializer


User = get_user_model()

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer.UserCreateSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer.UserSerializer


class UserLoginAPIView(APIView):
	permission_classes = [AllowAny]
	serializer_class = user_serializer.UserLoginSerializer

	def post(self, request, *args, **kwargs):
		data = request.data
		serializer = user_serializer.UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			new_data = serializer.data
			return Response(new_data, status=HTTP_200_OK)
		return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
