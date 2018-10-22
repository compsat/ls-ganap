from django.contrib.auth import get_user_model
from main_events.serializers import user_serializer
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.permissions import AllowAny, IsAuthenticated
from main_events.serializers import user_serializer
from main_events.jwt_authentication import MyJWTAuthentication


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


class UpdatePassword(APIView):
	serializer_class = user_serializer.ChangePasswordSerializer
	authentication_classes = [MyJWTAuthentication,]
	permission_classes = [IsAuthenticated,]

	def get_object(self, queryset=None):
		return self.request.user

	def put(self, request, *args, **kwargs):
		self.object = self.get_object()
		serializer = user_serializer.ChangePasswordSerializer(data=request.data)

		if serializer.is_valid():
			old_password = serializer.data.get("old_password")
			# print(self.object)
			if not self.object.check_password(old_password):
				return Response({"old_password": ["wrong password"]}, status=HTTP_400_BAD_REQUEST)

			self.object.set_password(serializer.data.get("new_password"))
			self.object.save()
			return Response("Password for user: {} changed.".format(self.object), status=HTTP_200_OK)

		return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)




