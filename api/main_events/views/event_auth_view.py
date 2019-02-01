import httplib2
from googleapiclient.discovery import build
from django.conf import settings
from oauth2client import file, client, tools
from main_events.models import Event, EventLogistic, SangguHost, OrgHost, OfficeHost, EventCalendar
import os, json
from datetime import datetime
import google_auth_oauthlib.flow
from django.shortcuts import redirect
from django.urls import reverse
import google.oauth2.credentials
import requests
from oauthlib.oauth2.rfc6749.errors import MissingCodeError
from google.auth.exceptions import RefreshError
from decouple import config
from google.oauth2 import service_account
from main_events.auth_vars import host_calendar_ids

CLIENT_SECRETS_FILE = 'client_secrets.json'
SCOPES = ['https://www.googleapis.com/auth/calendar']

# ------------------ REMOVE IN PRODUCTION ----------------------
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

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

service_secrets = '{{"type":"{}", "project_id": "{}", "private_key_id": "{}", "private_key": "{}", "client_email": "{}", "client_id": "{}", "auth_uri" : "{}", "token_uri" : "{}", "auth_provider_x509_cert_url" : "{}", "client_x509_cert_url" : "{}"}}'.format(
	config('SERVICE_TYPE'), config('SERVICE_PROJECT_ID'), 
	config('SERVICE_PRIVATE_KEY_ID'), config('SERVICE_PRIVATE_KEY'), 
	config('SERVICE_CLIENT_EMAIL'), config('SERVICE_CLIENT_ID'), 
	config('SERVICE_AUTH_URI'), config('SERVICE_TOKEN_URI'), 
	config('SERVICE_AUTH_PROVIDER'), config('SERVICE_CLIENT_X509_CERT_URL')
	)

def create_events(request, pk):
	if 'credentials' not in request.session or request.session['credentials'] is None:
		"""
		Instead of passing the pk as parameters to the views,
		I just stored the pk in the session.
		"""
		request.session['pk'] = pk
		request.session['endpoint'] = 'create_events'
		return redirect('authorize')
	
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

	first_date = None
	auth_user = None

	try:
		event = Event.objects.filter(is_approved=True).get(pk=pk)
		event_logistics = EventLogistic.objects.filter(event=pk)
		for logistic in event_logistics:
			start_time = datetime.combine(logistic.date, logistic.start_time)
			if first_date is None:
				first_date = logistic.date
			end_time = datetime.combine(logistic.date, logistic.end_time)
			location = None
			if logistic.venue:
				location = logistic.venue.name
			else:
				location = logistic.outside_venue_name
				
			EVENT = {
				"summary": event.name,
				"location": location,
				"description": event_instance.description,
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
	del request.session['endpoint']
	if auth_user:
		return redirect('https://calendar.google.com/calendar/r/day/{}/{}/{}?authuser={}'.format(first_date.year, first_date.month, first_date.day, auth_user))
	else:
		return redirect('https://calendar.google.com/calendar/')

"""
Every time a new event is approved, this method gets called to add the event to the service account's
calendar of the event host.
"""
def sync_calendar(event_instance):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	for host in event_instance.sanggu_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_event_to_calendar(service, event_instance, calendarId, host, 'sanggu')
	for host in event_instance.office_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_event_to_calendar(service, event_instance, calendarId, host, 'office')
	for host in event_instance.org_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_event_to_calendar(service, event_instance, calendarId, host, 'org')

def add_event_to_calendar(service, event_instance, calendarId, host, host_type):
	event_logistics = EventLogistic.objects.filter(event=event_instance.pk)
	for logistic in event_logistics:
		start_time = datetime.combine(logistic.date, logistic.start_time)
		end_time = datetime.combine(logistic.date, logistic.end_time)
		location = None
		if logistic.venue:
			location = logistic.venue.name
		else:
			location = logistic.outside_venue_name

		EVENT = {
			"summary": event_instance.name,
			"location": location,
			"description": event_instance.description,
			"start": {'dateTime': start_time.isoformat(), 'timeZone': 'Asia/Manila'},
			"end": {'dateTime': end_time.isoformat(), 'timeZone': 'Asia/Manila'}
		}
		eventTest = service.events().insert(calendarId=calendarId, body=EVENT).execute()

		obj = EventCalendar.objects.create(event=event_instance, event_cal_id=eventTest['id'], event_logistic=logistic)
		if host_type == 'sanggu':
			obj.sanggu_host = host
		elif host_type == 'org':
			obj.org_host = host
		elif host_type == 'office':
			obj.office_host = host
		obj.save()

"""
Adds the Calendar of the host to the authenticated user's calendar list
"""
def add_calendar_to_list(request, pk):
	if 'credentials' not in request.session or request.session['credentials'] is None:
		"""
		Instead of passing the pk as parameters to the views,
		I just stored the pk in the session.
		"""
		request.session['pk'] = pk
		request.session['endpoint'] = 'add_calendar_to_list'
		return redirect('authorize')
	
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

	first_date = None
	auth_user = None

	try:
		calendar = {
			'id' : host_calendar_ids[pk]
		}
		new_calendar = service.calendarList().insert(body=calendar).execute()
		EVENT = {
			"summary": "test",
			'start': {
				'dateTime': '2015-05-28T09:00:00-07:00',
				'timeZone': 'America/Los_Angeles',
			},
			'end': {
				'dateTime': '2015-05-28T17:00:00-07:00',
				'timeZone': 'America/Los_Angeles',
			},
		}
		new_event = service.events().insert(calendarId='primary', body=EVENT).execute()
		auth_user = new_event['creator']['email']
		deleted_event = service.events().delete(calendarId='primary', eventId=new_event['id']).execute()

		# Save credentials back to session in case access token was refreshed.
		# ACTION ITEM: In a production app, you likely want to save these
		#              credentials in a persistent database instead.
		request.session['credentials'] = credentials_to_dict(credentials)
	except RefreshError:
		request.session['pk'] = pk
		return redirect('authorize')

	request.session['pk'] = None
	if auth_user:
		return redirect('https://calendar.google.com/calendar/r/?authuser={}'.format(auth_user))
	else:
		return redirect('https://calendar.google.com/calendar/')

"""
Every time a logistic changes, this method gets called to sync the event to the service account's
calendar of the event host.
"""
def change_logistics(event_logistic):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	for event_cal_instance in event_logistic.event_calendar_links.all():
		curr_id = event_cal_instance.event_cal_id

		host = None
		if event_cal_instance.sanggu_host:
			host = event_cal_instance.sanggu_host
		elif event_cal_instance.org_host:
			host = event_cal_instance.org_host
		elif event_cal_instance.office_host:
			host = event_cal_instance.office_host

		calendarId = host_calendar_ids[host.pk]
		event = service.events().get(calendarId=calendarId, eventId=curr_id).execute()

		start_time = datetime.combine(event_logistic.date, event_logistic.start_time)
		end_time = datetime.combine(event_logistic.date, event_logistic.end_time)
		location = None
		if event_logistic.venue:
			location = event_logistic.venue.name
		else:
			location = event_logistic.outside_venue_name

		event['location'] = location
		event['start'] = {'dateTime': start_time.isoformat(), 'timeZone': 'Asia/Manila'}
		event['end'] = {'dateTime': end_time.isoformat(), 'timeZone': 'Asia/Manila'}

		updated_event = service.events().update(calendarId=calendarId, eventId=event['id'], body=event).execute()

"""
Every time a logistic is deleted, this method gets called to sync the event to the service account's
calendar of the event host.
"""
def delete_logistics(event_logistic):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	for event_cal_instance in event_logistic.event_calendar_links.all():
		curr_id = event_cal_instance.event_cal_id

		host = None
		if event_cal_instance.sanggu_host:
			host = event_cal_instance.sanggu_host
		elif event_cal_instance.org_host:
			host = event_cal_instance.org_host
		elif event_cal_instance.office_host:
			host = event_cal_instance.office_host

		calendarId = host_calendar_ids[host.pk]
		service.events().delete(calendarId=calendarId, eventId=curr_id).execute()

"""
Every time a logistic is created, this method gets called to sync the event to the service account's
calendar of the event host.
"""
def new_logistic(event_logistic):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	event_instance = event_logistic.event
	for host in event_instance.sanggu_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_new_logistic_to_calendar(service, event_logistic, calendarId, host, 'sanggu')
	for host in event_instance.office_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_new_logistic_to_calendar(service, event_logistic, calendarId, host, 'office')
	for host in event_instance.org_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_new_logistic_to_calendar(service, event_logistic, calendarId, host, 'org')

def add_new_logistic_to_calendar(service, logistic, calendarId, host, host_type):
	event_instance = logistic.event
	start_time = datetime.combine(logistic.date, logistic.start_time)
	end_time = datetime.combine(logistic.date, logistic.end_time)
	location = None
	if logistic.venue:
		location = logistic.venue.name
	else:
		location = logistic.outside_venue_name

	EVENT = {
		"summary": event_instance.name,
		"location": location,
		"description": event_instance.description,
		"start": {'dateTime': start_time.isoformat(), 'timeZone': 'Asia/Manila'},
		"end": {'dateTime': end_time.isoformat(), 'timeZone': 'Asia/Manila'}
	}
	eventTest = service.events().insert(calendarId=calendarId, body=EVENT).execute()

	obj = EventCalendar.objects.create(event=event_instance, event_cal_id=eventTest['id'], event_logistic=logistic)
	if host_type == 'sanggu':
		obj.sanggu_host = host
	elif host_type == 'org':
		obj.org_host = host
	elif host_type == 'office':
		obj.office_host = host
	obj.save()

"""
Every time a host is added to an event, this method gets called to sync the event to the service account's
calendar of the event host.
"""
def add_hosts(event_instance, new_hosts):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	for host_pk in new_hosts:
		if host_pk in host_calendar_ids:
			calendarId = host_calendar_ids[host_pk]
			if OrgHost.objects.filter(pk=host_pk).exists():
				add_event_to_calendar(service, event_instance, calendarId, OrgHost.objects.get(pk=host_pk), 'org')
			elif SangguHost.objects.filter(pk=host_pk).exists():
				add_event_to_calendar(service, event_instance, calendarId, SangguHost.objects.get(pk=host_pk), 'sanggu')
			elif OfficeHost.objects.filter(pk=host_pk).exists():
				add_event_to_calendar(service, event_instance, calendarId, OfficeHost.objects.get(pk=host_pk), 'office')

"""
Every time a host is removed from an event, this method gets called to sync the event to the service account's
calendar of the event host.
"""
def remove_hosts(event_instance, new_hosts):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	for host_pk in new_hosts:
		if host_pk in host_calendar_ids:
			calendarId = host_calendar_ids[host_pk]
			if OrgHost.objects.filter(pk=host_pk).exists():
				delete_event_from_calendar(service, event_instance, calendarId, OrgHost.objects.get(pk=host_pk), 'org')
			elif SangguHost.objects.filter(pk=host_pk).exists():
				delete_event_from_calendar(service, event_instance, calendarId, SangguHost.objects.get(pk=host_pk), 'sanggu')
			elif OfficeHost.objects.filter(pk=host_pk).exists():
				delete_event_from_calendar(service, event_instance, calendarId, OfficeHost.objects.get(pk=host_pk), 'office')

def delete_event_from_calendar(service, event_instance, calendarId, host, host_type):
	try:
		event_cal_instance = None
		if host_type == 'org':
			event_cal_instance = EventCalendar.objects.filter(event=event_instance, org_host=host)[0]
		elif host_type == 'sanggu':
			event_cal_instance = EventCalendar.objects.filter(event=event_instance, sanggu_host=host)[0]
		elif host_type == 'office':
			event_cal_instance = EventCalendar.objects.filter(event=event_instance, office_host=host)[0]

		curr_id = event_cal_instance.event_cal_id
		service.events().delete(calendarId=calendarId, eventId=curr_id).execute()
	except IndexError:
		pass

"""
Every time an event's details (other than logistics) changes, this method gets called to sync 
the event to the service account's calendar of the event host.
"""
def change_details(event_instance):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	name = event_instance.name
	description = event_instance.description

	for event_cal_instance in event_instance.event_calendars.all():
		curr_id = event_cal_instance.event_cal_id

		host = None
		if event_cal_instance.sanggu_host:
			host = event_cal_instance.sanggu_host
		elif event_cal_instance.org_host:
			host = event_cal_instance.org_host
		elif event_cal_instance.office_host:
			host = event_cal_instance.office_host

		calendarId = host_calendar_ids[host.pk]
		event = service.events().get(calendarId=calendarId, eventId=curr_id).execute()

		event['summary'] = name
		event['description'] = description

		updated_event = service.events().update(calendarId=calendarId, eventId=event['id'], body=event).execute()

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
	# print(authorization_response)

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
		if request.session['endpoint'] == 'create_events':
			return redirect(reverse('create_events', args=[request.session['pk']]))
		elif request.session['endpoint'] == 'sync_host':
			return redirect(reverse('sync_host', args=[request.session['host_type'], request.session['pk']]))
		elif request.session['endpoint'] == 'add_calendar_to_list':
			return redirect(reverse('add_calendar_to_list', args=[request.session['add_calendar_to_list'], request.session['pk']]))

	return redirect('/events')

def credentials_to_dict(credentials):
	return {'token': credentials.token,
			'refresh_token': credentials.refresh_token,
			'token_uri': credentials.token_uri,
			'client_id': credentials.client_id,
			'client_secret': credentials.client_secret,
			'scopes': credentials.scopes}