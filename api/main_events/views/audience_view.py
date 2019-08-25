from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from main_events.models import Event

class AudienceList(APIView):
    """
    View to list all possible choices of audience
    """

    def get(self, request, format=None):
        """
        Return a list of all choices for audience.
        """

        choices = [{"value" : value, "name" : name} for value, name in Event.AUDIENCE_CHOICES]
        return Response(choices)