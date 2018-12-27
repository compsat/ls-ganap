"""ls_ganap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework_swagger.views import get_swagger_view
from .swagger_schema import SwaggerSchemaView
from django.contrib.auth import views as auth_views

from rest_framework_jwt.views import ObtainJSONWebToken, RefreshJSONWebToken
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from main_events.views import api_root_view


obtain_jwt_token = ObtainJSONWebToken.as_view(
    user_model='main_events.User'
    )

schema_view = get_swagger_view(title='LS Ganap API')


urlpatterns = [
    path('', api_root_view.api_root, name='index'),
    path('admin/', admin.site.urls),
    path(
        'admin/password_reset/',
        auth_views.PasswordResetView.as_view(),
        name='admin_password_reset',
    ),
    path(
        'admin/password_reset/done/',
        auth_views.PasswordResetDoneView.as_view(),
        name='password_reset_done',
    ),
    path(
        'reset/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm',
    ),
    path(
        'reset/done/',
        auth_views.PasswordResetCompleteView.as_view(),
        name='password_reset_complete',
    ),
    path('', include('main_events.urls')),
    path('docs/', schema_view, name='docs'),
    path('auth/token/', obtain_jwt_token, name='auth-jwt-get'),
    path('auth/token-reset/', refresh_jwt_token, name='auth-jwt-refresh'),
    path('auth/token-verify/', verify_jwt_token, name='auth-jwt-verify'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    # path('docs', SwaggerSchemaView.as_view())
]
