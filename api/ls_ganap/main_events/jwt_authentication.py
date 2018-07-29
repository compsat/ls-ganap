from rest_framework_jwt import authentication

class MyJWTAuthentication(authentication.JSONWebTokenAuthentication):
    user_model = 'main_events.User'


