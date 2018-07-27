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
from django.urls import path, re_path
from django.conf.urls import include, url
from django.views.i18n import JavaScriptCatalog
from rest_framework_swagger.views import get_swagger_view
from .swagger_schema import SwaggerSchemaView

schema_view = get_swagger_view(title='LS Ganap API')

js_info_dict = {
    'packages': ('recurrence', ),
}

urlpatterns = [
    path('admin', admin.site.urls),
    path('', include('main_events.urls')),
    path('docs', schema_view),
    re_path(r'^jsi18n/$', JavaScriptCatalog.as_view(), js_info_dict),
    # path('docs', SwaggerSchemaView.as_view())
]
