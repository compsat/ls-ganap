from rest_framework_jwt import authentication
from main_events.serializers.user_serializer import UserSerializer

class MyJWTAuthentication(authentication.JSONWebTokenAuthentication):
    user_model = 'main_events.User'


def jwt_response_payload_handler(token, user=None, request=None):
	hostId = None
	if hasattr(user, 'sanggu_host'):
		hostId = user.sanggu_host.id
	elif hasattr(user, 'org_host'):
		hostId = user.org_host.id
	elif hasattr(user, 'office_host'):
		hostId = user.office_host.id

	return {
		'token': token,
		'email': user.email,
		'id': hostId
	}