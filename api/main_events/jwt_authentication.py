from rest_framework_jwt import authentication
from main_events.serializers.user_serializer import UserSerializer

class MyJWTAuthentication(authentication.JSONWebTokenAuthentication):
    user_model = 'main_events.User'


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'email': user.email,
        'id': user.id
    }