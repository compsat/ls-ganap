from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(["GET"])
def api_root(request, format=None):
	return Response(
		{	
			'docs': reverse('docs', request=request, format=format),
			'auth-token': reverse('auth-jwt-get', request=request, format=format),
			# 'auth-token-reset': reverse('auth-jwt-refresh', request=request, format=format),
			'token-verify': reverse('auth-jwt-verify', request=request, format=format),
			'events': reverse('event-list', request=request, format=format),
			'event_hosts': reverse('host-list', request=request, format=format),
			'orgs': reverse('org-list', request=request, format=format),
			'offices': reverse('office-list', request=request, format=format),
			'sanggu': reverse('sanggu-list', request=request, format=format),
			'orgs_type': reverse('org-type-list', request=request, format=format),
			'tags': reverse('tag-list', request=request, format=format),
			'clusters': reverse('cluster-list', request=request, format=format),
			'venues': reverse('venue-list', request=request, format=format)
		},
)