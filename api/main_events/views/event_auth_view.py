import httplib2
from googleapiclient.discovery import build
from django.conf import settings
from oauth2client import file, client, tools
from main_events.models import Event, EventLogistic
import os
from datetime import datetime
import google_auth_oauthlib.flow
from django.shortcuts import redirect
from django.urls import reverse
import google.oauth2.credentials
import requests
from oauthlib.oauth2.rfc6749.errors import MissingCodeError
from google.auth.exceptions import RefreshError
from decouple import config

CLIENT_SECRETS_FILE = 'client_secrets.json'
SCOPES = 'https://www.googleapis.com/auth/calendar'

# ------------------ REMOVE IN PRODUCTION ----------------------
# os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

client_secrets = {
	"web": {"client_id" : config('CLIENT_ID'),
		"project_id": config('PROJECT_ID'),
		"auth_uri" : config('AUTH_URI'),
		"token_uri" : config('TOKEN_URI'),
		"auth_provider_x509_cert_url" : config('AUTH_PROVIDER'),
		"client_secret" : config('CLIENT_SECRET'),
		"redirect_uris" : config('REDIRECT_URIS')
		}
}

def create_events(request, pk):
	if 'credentials' not in request.session or request.session['credentials'] is None:
		"""
		Instead of passing the pk as parameters to the views,
		I just stored the pk in the session.
		"""
		request.session['pk'] = pk
		return redirect('authorize')
	
	# print(request.session['credentials'])

	  # Load credentials from the session.
	credentials = google.oauth2.credentials.Credentials(
		**request.session['credentials'])

	if credentials.expired:
		try:
			credentials.refresh(request)
		except:
			request.session['credentials'] = None
			request.session['pk'] = pk
			return redirect('authorize')

	service = build('calendar', 'v3', credentials=credentials)
	# print(service)

	first_date = None
	auth_user = None

	try:
		event = Event.objects.get(pk=pk)
		event_logistics = EventLogistic.objects.filter(event=pk)
		for logistic in event_logistics:
			start_time = datetime.combine(logistic.date, logistic.start_time)
			if first_date is None:
				first_date = logistic.date
			end_time = datetime.combine(logistic.date, logistic.end_time)
			EVENT = {
				"summary": event.name,
				"start": {'dateTime': start_time.isoformat(), 'timeZone': 'Asia/Manila'},
				"end": {'dateTime': end_time.isoformat(), 'timeZone': 'Asia/Manila'}
			}
			eventTest = service.events().insert(calendarId='primary', body=EVENT).execute()
			auth_user = eventTest['creator']['email']
			# print(eventTest)

		# Save credentials back to session in case access token was refreshed.
		# ACTION ITEM: In a production app, you likely want to save these
		#              credentials in a persistent database instead.
		request.session['credentials'] = credentials_to_dict(credentials)
	except RefreshError:
		request.session['pk'] = pk
		return redirect('authorize')

	request.session['pk'] = None
	if auth_user:
		return redirect('https://calendar.google.com/calendar/r/day/{}/{}/{}?authuser={}'.format(first_date.year, first_date.month, first_date.day, auth_user))
	else:
		return redirect('https://calendar.google.com/calendar/')

def authorize(request):
  # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
	flow = google_auth_oauthlib.flow.Flow.from_client_config(
    	client_secrets, SCOPES)

	flow.redirect_uri = request.build_absolute_uri(reverse('oauth2callback'))

	authorization_url, state = flow.authorization_url(
    	# Enable offline access so that you can refresh an access token without
    	# re-prompting the user for permission. Recommended for web server apps.
		access_type='offline',
		# Enable incremental authorization. Recommended as a best practice.
		include_granted_scopes='true',
		prompt='select_account',
		)

	# Store the state so the callback can verify the auth server response.
	request.session['state'] = state

	return redirect(authorization_url)

def oauth2callback(request):
	# Specify the state when creating the flow in the callback so that it can
	# verified in the authorization server response.
	state = request.session['state']

	flow = google_auth_oauthlib.flow.Flow.from_client_config(
	  client_secrets, scopes=SCOPES, state=state)
	flow.redirect_uri = request.build_absolute_uri(reverse('oauth2callback'))

	# Use the authorization server's response to fetch the OAuth 2.0 tokens.
	authorization_response = request.build_absolute_uri()
	print(authorization_response)

	"""
	If the user grants the permission, the token is fetched, but if the user does not grant,
	they are just redirected back to /events.
	"""
	try:
		flow.fetch_token(authorization_response=authorization_response)
	except:
		return redirect('/events')

	# Store credentials in the session.
	# ACTION ITEM: In a production app, you likely want to save these
	#              credentials in a persistent database instead.
	credentials = flow.credentials
	request.session['credentials'] = credentials_to_dict(credentials)

	"""
	If the user directly goes to /google_auth without going to events/google_api/<pk> (hence there's no
	pk in the session), then this will just redirect the user to /events. Otherwise, they are redirected
	back to event/google_api/<pk> (pk is obtained from the session) and the event is added to the calendar.
	"""
	if 'pk' in request.session and request.session['pk'] is not None:
		return redirect(reverse('create_events', args=[request.session['pk']]))
	else:
		return redirect('/events')

def credentials_to_dict(credentials):
	return {'token': credentials.token,
			'refresh_token': credentials.refresh_token,
			'token_uri': credentials.token_uri,
			'client_id': credentials.client_id,
			'client_secret': credentials.client_secret,
			'scopes': credentials.scopes}