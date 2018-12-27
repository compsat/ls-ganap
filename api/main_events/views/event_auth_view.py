import httplib2
from googleapiclient.discovery import build
from django.conf import settings
from oauth2client import file, client, tools
from main_events.models import Event, EventLogistic, SangguHost, OrgHost, OfficeHost
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

CLIENT_SECRETS_FILE = 'client_secrets.json'
SCOPES = ['https://www.googleapis.com/auth/calendar']

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

service_secrets = '{{"type":"{}", "project_id": "{}", "private_key_id": "{}", "private_key": "{}", "client_email": "{}", "client_id": "{}", "auth_uri" : "{}", "token_uri" : "{}", "auth_provider_x509_cert_url" : "{}", "client_x509_cert_url" : "{}"}}'.format(
	config('SERVICE_TYPE'), config('SERVICE_PROJECT_ID'), 
	config('SERVICE_PRIVATE_KEY_ID'), config('SERVICE_PRIVATE_KEY'), 
	config('SERVICE_CLIENT_EMAIL'), config('SERVICE_CLIENT_ID'), 
	config('SERVICE_AUTH_URI'), config('SERVICE_TOKEN_URI'), 
	config('SERVICE_AUTH_PROVIDER'), config('SERVICE_CLIENT_X509_CERT_URL')
	)

host_calendar_ids = {
	1 : "0726ffaurhufimpoq0lfcjlkns@group.calendar.google.com",
	2 : "dsekcjc4ugh0j44a4jkuq4ldkk@group.calendar.google.com",
	3 : "5rnbodbhi3r7cnstv1aaecp068@group.calendar.google.com",
	4 : "g2m4knupgjk47hqjsb9f6svots@group.calendar.google.com",
	5 : "smt22775pf0e1iut2hif38b614@group.calendar.google.com",
	6 : "8nm9oao8c8d7gt1rj29dilmu0g@group.calendar.google.com",
	9 : "hk5oam2vmpseui1br47jfp012c@group.calendar.google.com",
	10 : "vc4ku0jucnl061hnv9uoa1jse0@group.calendar.google.com",
	11 : "priohue7aun814rhm2hioug6ak@group.calendar.google.com",
	12 : "0hlcoevdc1n95v2gulu7eoh5ik@group.calendar.google.com",
	13 : "v5d9bh2o42l6jp8p9gi1bcflbo@group.calendar.google.com",
	15 : "1ajgvakkgng3j3indc6hugse78@group.calendar.google.com",
	16 : "vru6jf2un35n8c6rao7u5v6cgc@group.calendar.google.com",
	17 : "5og5t98a7sa1efbjq861oi7l3c@group.calendar.google.com",
	18 : "tnb37v7fc24sa2ta0o4rc90ej8@group.calendar.google.com",
	19 : "9i7d8su0svo3m4ev5i8trpohj4@group.calendar.google.com",
	22 : "3b6isana5kqtfl184pjgunbfmo@group.calendar.google.com",
	24 : "jr1o6k8pd1a7gvi73jot4so79c@group.calendar.google.com",
	27 : "t5ncbb3pd05k25dunvnm2ultg4@group.calendar.google.com",
	30 : "sqr1t7kn9m12frg9rnmmcsn7o4@group.calendar.google.com",
	34 : "ghb7jlpns0gtd01qcsdllfr3cc@group.calendar.google.com",
	35 : "mb6rh0agg17nelnmvbsa5qmcek@group.calendar.google.com",
	36 : "somuah46qq81tip8vo4d53btmo@group.calendar.google.com",
	40 : "2jgjk0s85dnphulc56tceog20c@group.calendar.google.com",
	41 : "v6gfa7g480lec5p04dsus1p0dc@group.calendar.google.com",
	43 : "ht3suvt65uogor70iv9g7o3pp8@group.calendar.google.com",
	46 : "88m58c14olvompri9aeqn7telk@group.calendar.google.com",
	47 : "qb05hskcppvb0809j547li63no@group.calendar.google.com",
	49 : "l30kb7j94n8as23gsdse65siho@group.calendar.google.com",
	51 : "qvehq3epk5tecp4iqehi2qcqs0@group.calendar.google.com",
	58 : "nepq1nqmri0hil21i97omm9q84@group.calendar.google.com",
	59 : "953r9fo5hts9vpoo158em12fs8@group.calendar.google.com",
	60 : "gcqddd9jef79kcus9qq15u07kc@group.calendar.google.com",
	61 : "biqi2qgotvi7e81231me15t68k@group.calendar.google.com",
	62 : "g2vr4mh61p5vbqgm1tcnum1eek@group.calendar.google.com",
	63 : "pb3mbfere8rrcgjgtvo5qpnvro@group.calendar.google.com",
	64 : "orn2nep9r4u3qv58mavoe2cqek@group.calendar.google.com",
	65 : "tjrrqtp89ar3vr2p4jkomobia4@group.calendar.google.com",
	66 : "id140kb4vd2a64r8jkeeqbv98o@group.calendar.google.com",
	67 : "r36bodcf87gqpbdhrqnag9iou0@group.calendar.google.com",
}

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
		event = Event.objects.get(pk=pk)
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
Syncs the Google Calendar of a user to the calendar of a host, given its pk.
"""
def sync_host(request, host_type, pk):
	if 'credentials' not in request.session or request.session['credentials'] is None:
		"""
		Instead of passing the pk as parameters to the views,
		I just stored the pk in the session.
		"""
		request.session['pk'] = pk
		request.session['endpoint'] = 'sync_host'
		request.session['host_type'] = host_type
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
		event_host = None
		events = None
		if host_type == 'sanggu':
			event_host = SangguHost.objects.get(pk=pk)
			events = Event.objects.filter(sanggu_hosts=pk, is_approved=True)
		elif host_type == 'orgs':
			event_host = OrgHost.objects.get(pk=pk)
			events = Event.objects.filter(org_hosts=pk, is_approved=True)
		elif host_type == 'offices':
			event_host = OfficeHost.objects.get(pk=pk)
			events = Event.objects.filter(office_hosts=pk, is_approved=True)
		else:
			return redirect('index')

		calendar = {
		    'summary': event_host.name,
		    'timeZone': 'Asia/Manila'
		}
		host_calendar = service.calendars().insert(body=calendar).execute()

		for event in events:
			event_logistics = EventLogistic.objects.filter(event=event.pk)
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
				eventTest = service.events().insert(calendarId=host_calendar['id'], body=EVENT).execute()
				auth_user = eventTest['creator']['email']

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

def get_calendar(request):
	# info = json.loads(service_secrets)
	# credentials = service_account.Credentials.from_service_account_info(
	# 	info, scopes=SCOPES)
	if 'credentials' not in request.session or request.session['credentials'] is None:
		"""
		Instead of passing the pk as parameters to the views,
		I just stored the pk in the session.
		"""
		request.session['pk'] = pk
		request.session['endpoint'] = 'sync_host'
		request.session['host_type'] = host_type
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

	page_token = None
	while True:
		calendar_list = service.calendarList().list(pageToken=page_token).execute()
		orgs = OrgHost.objects.all()
		sanggu = SangguHost.objects.all()
		org_list = []
		for calendar_list_entry in calendar_list['items']:
			rule = {
				'scope' : {
					'type' : 'user',
					'value' : 'ls-ganap-calendars@ls-ganap-225801.iam.gserviceaccount.com',
				},
				'role' : 'writer'
			}
			created_rule = service.acl().insert(calendarId=calendar_list_entry['id'], body=rule).execute()
			print(created_rule['id'])
			for org in orgs:
				if org.name == calendar_list_entry['summary']:
					org_list.append((org.pk, calendar_list_entry['id']))
					break
			for org in sanggu:
				if org.name == calendar_list_entry['summary']:
					org_list.append((org.pk, calendar_list_entry['id']))
					break
			# print(calendar_list_entry['summary'])
		org_list = sorted(org_list)
		# print(org_list)
		# file = open('calendar_ids.txt', 'w')
		# for idx, cId in org_list:
		# 	file.write('{} : "{}",\n'.format(idx, cId))
		page_token = calendar_list.get('nextPageToken')
		if not page_token:
			break

	return redirect('https://calendar.google.com/calendar/')

def add_calendars(request):
	if 'credentials' not in request.session or request.session['credentials'] is None:
		"""
		Instead of passing the pk as parameters to the views,
		I just stored the pk in the session.
		"""
		# request.session['pk'] = pk
		request.session['endpoint'] = 'sync_host'
		# request.session['host_type'] = host_type
		return redirect('authorize')
	
	  # Load credentials from the session.
	credentials = google.oauth2.credentials.Credentials(
		**request.session['credentials'])

	if credentials.expired:
		try:
			credentials.refresh(request)
		except:
			request.session['credentials'] = None
			# request.session['pk'] = pk
			return redirect('authorize')

	service = build('calendar', 'v3', credentials=credentials)

	first_date = None
	auth_user = None

	try:
		file = open('calendar_orgs.txt', 'w')
		orgs = OrgHost.objects.all().order_by('pk')
		for idx, host in enumerate(orgs, start=1):
			if idx not in host_calendar_ids:
				calendar = {
				    'summary': host.name,
				    'timeZone': 'Asia/Manila'
				}
				host_calendar = service.calendars().insert(body=calendar).execute()
				file.write('{} : "{}",\n'.format(idx, host_calendar['id']))
				print(host_calendar['id'])

		# Save credentials back to session in case access token was refreshed.
		# ACTION ITEM: In a production app, you likely want to save these
		#              credentials in a persistent database instead.
		request.session['credentials'] = credentials_to_dict(credentials)
	except RefreshError:
		request.session['pk'] = pk
		return redirect('authorize')

	return redirect('https://calendar.google.com/calendar/')

def del_calendars(request):
	# Load credentials from the session.
	info = json.loads(service_secrets)
	# print(info)
	credentials = service_account.Credentials.from_service_account_info(
		info, scopes=SCOPES)

	service = build('calendar', 'v3', credentials=credentials)

	page_token = None
	while True:
		calendar_list = service.calendarList().list(pageToken=page_token).execute()
		for calendar_list_entry in calendar_list['items']:
			if calendar_list_entry['summary'] != 'Ateneo Commission on Elections':
				calendar = service.calendars().delete(calendarId=calendar_list_entry['id']).execute()
				# print(calendar['summary'])
		page_token = calendar_list.get('nextPageToken')
		if not page_token:
			break

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
			add_event_to_calendar(service, event_instance, calendarId)
	for host in event_instance.office_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_event_to_calendar(service, event_instance, calendarId)
	for host in event_instance.org_hosts.all():
		if host.pk in host_calendar_ids:
			calendarId = host_calendar_ids[host.pk]
			add_event_to_calendar(service, event_instance, calendarId)

def add_event_to_calendar(service, event_instance, calendarId):
	# try:
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
	# except RefreshError:
	# 	print("Unable to add event to calendar")

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
	
	return redirect('/events')

def credentials_to_dict(credentials):
	return {'token': credentials.token,
			'refresh_token': credentials.refresh_token,
			'token_uri': credentials.token_uri,
			'client_id': credentials.client_id,
			'client_secret': credentials.client_secret,
			'scopes': credentials.scopes}