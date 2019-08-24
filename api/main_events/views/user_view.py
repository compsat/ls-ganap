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
from rest_framework_jwt.utils import jwt_encode_handler,jwt_payload_handler


User = get_user_model()

from django.http import JsonResponse
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from requests.exceptions import HTTPError
from django.contrib.auth import login
 
from social_django.utils import load_strategy, load_backend
from social_core.backends.oauth import BaseOAuth2
from social_core.exceptions import MissingBackend, AuthTokenError, AuthForbidden
 
class SocialLoginView(generics.GenericAPIView):
    """Log in using Google Auth"""
    serializer_class = user_serializer.SocialSerializer
    permission_classes = [permissions.AllowAny]
 
    def post(self, request):
        """Authenticate user through the provider and access_token"""
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = serializer.data.get('provider', None)
        strategy = load_strategy(request)
 
        try:
            backend = load_backend(strategy=strategy, name=provider,
            redirect_uri=None)
 
        except MissingBackend:
            return Response({'error': 'Please provide a valid provider'},
            status=status.HTTP_400_BAD_REQUEST)
        try:
            if isinstance(backend, BaseOAuth2):
                access_token = serializer.data.get('access_token')
            user = backend.do_auth(access_token)
        except HTTPError as error:
            return Response({
                "error": {
                    "access_token": "Invalid token",
                    "details": str(error)
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        except AuthTokenError as error:
            return Response({
                "error": "Invalid credentials",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)
        except AuthForbidden as error:
            return Response({
                "error":"Only Ateneo emails are allowed.",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)
 
        try:
            authenticated_user = backend.do_auth(access_token, user=user)
       
        except HTTPError as error:
            return Response({
                "error":"invalid token",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)
       
        except AuthForbidden as error:
            return Response({
                "error":"invalid token",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)
 
        if authenticated_user and authenticated_user.is_active:
            #generate JWT token
            login(request, authenticated_user)
            data={
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                )}
            hostId = None
            if hasattr(authenticated_user, 'sanggu_host'):
                hostId = authenticated_user.sanggu_host.id
            elif hasattr(authenticated_user, 'org_host'):
                hostId = authenticated_user.org_host.id
            elif hasattr(authenticated_user, 'office_host'):
                hostId = authenticated_user.office_host.id
            #customize the response to your needs
            response = {
                "token": data.get('token'),
                "email": authenticated_user.email,
                "userId": hostId
            }
            return Response(status=status.HTTP_200_OK, data=response)

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




