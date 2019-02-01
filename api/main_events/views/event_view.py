from main_events.models import Event, EventLogistic, OrgHost, SangguHost, OfficeHost
from main_events.serializers import event_serializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# import the pagination settings
from main_events.pagination import ObjectLimitOffsetPagination, ObjectPageNumberPagination
from rest_framework import status
# import Query lookups
from django.db.models import Q
from django.http import Http404
from datetime import datetime, timedelta
from rest_framework.filters import SearchFilter, OrderingFilter
from main_events.swagger import SimpleFilterBackend
from main_events.helper_methods import get_dates_between, tags_hostgroup_filter
from rest_framework.schemas import AutoSchema
import coreapi, coreschema
from django.utils import timezone
from django.db.models import Min
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from main_events.jwt_authentication import MyJWTAuthentication
from main_events.permissions import IsOwnerOrReadOnly, IsEventHostOrReadOnly

host_map = {
    '1' : Q(sanggu_hosts__isnull=False),
    '2' : Q(office_hosts__isnull=False),
    '3' : Q(org_hosts__isnull=False),
    '4' : Q(org_hosts__org_type__abbreviation='COP'),
    '5' : Q(org_hosts__org_type__abbreviation='COA'),
    '6' : Q(org_hosts__cluster__abbreviation='ADC'),
    '7' : Q(org_hosts__cluster__abbreviation='BC'),
    '8' : Q(org_hosts__cluster__abbreviation='FFC'),
    '9' : Q(org_hosts__cluster__abbreviation='HEC'),
    '10' : Q(org_hosts__cluster__abbreviation='IRC'),
    '11' : Q(org_hosts__cluster__abbreviation='MCA'),
    '12' : Q(org_hosts__cluster__abbreviation='PAC'),
    '13' : Q(org_hosts__cluster__abbreviation='SBC'),
    '14' : Q(org_hosts__cluster__abbreviation='STC'),
}

class FilterEventsBetweenDates(generics.ListAPIView):
    """
    get: Gets all events between a start_date and an end_date.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "start_date",
            required=True,
            location="query",
            description='Specify a date in YYYY-MM-DD as the start of the range of dates.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "end_date",
            required=True,
            location="query",
            description='Specify a date in YYYY-MM-DD as the end of the range of dates, inclusive.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        coreapi.Field(
            "start_date",
            required=True,
            location="query",
            description='Specify a date in YYYY-MM-DD as the start of the range of dates.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "end_date",
            required=True,
            location="query",
            description='Specify a date in YYYY-MM-DD as the end of the range of dates, inclusive.',
            schema=coreschema.String()
        ),
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)

        queryset = Event.objects.approved_events_only()

        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return get_dates_between(start_date, end_date, queryset, Event.event_logistics)

class FilterEventByDate(generics.ListAPIView):
    """
    get: Gets all events given a specific date.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "date",
            required=True,
            location="path",
            description='Specify a date in YYYY-MM-DD to get all the events held on the same date.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        date = self.kwargs['date']
        queryset = Event.objects.approved_events_only()
        
        if date is not None:
            queryset = queryset.filter(event_logistics__date=date).order_by('first_date')

        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return queryset

class FilterEventByWeek(generics.ListAPIView):
    """
    get: Gets all the events happening in the week of the date input, 
    where the week is Monday-Sunday.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "date",
            required=True,
            location="path",
            description='Specify a date in YYYY-MM-DD to get all the events held in the same week.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        date = self.kwargs['date']
        get_date = datetime.strptime(date, '%Y-%m-%d')
        get_day = get_date.weekday()
        start_date = (get_date - timedelta(days=get_day))
        end_date = (get_date + timedelta(days=(6-get_day)))
        end_date = end_date + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)

        queryset = Event.objects.approved_events_only()

        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return get_dates_between(start_date, end_date, queryset, Event.event_logistics)

class FilterEventByMonth(generics.ListAPIView):
    """
    get: Gets all the events happening in the month of the input.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "date",
            required=True,
            location="path",
            description='Specify a date in YYYY-MM-DD or in MM-YYYY to get all the events held in the same month.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        date = self.kwargs['date']
        try:
            get_month = datetime.strptime(date, '%Y-%m-%d').date().month
            get_year = datetime.strptime(date, '%Y-%m-%d').date().year
        except ValueError:
            date_list = date.split("-")
            get_month = date_list[0]
            get_year = date_list[1]

        queryset = Event.objects.approved_events_only()

        if date is not None:
            queryset = queryset.filter(event_logistics__date__month=get_month, event_logistics__date__year=get_year).order_by('first_date')

        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return queryset

class FilterEventByOrg(generics.ListAPIView):
    """
    get: Gets all events under a specific org.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "id",
            required=True,
            location="path",
            description='Specify an org to get all events under that entity',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Event.objects.approved_events_only().filter(org_hosts__pk=pk)
        
        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return queryset

class FilterEventByOffice(generics.ListAPIView):
    """
    get: Gets all events under a specific office.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "id",
            required=True,
            location="path",
            description='Specify an office to get all events under that entity',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Event.objects.approved_events_only().filter(office_hosts__pk=pk)
        
        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return queryset

class FilterEventBySanggu(generics.ListAPIView):
    """
    get: Gets all events under a specific sanggu org.
    """
    serializer_class = event_serializer.EventSerializer
    pagination_class = ObjectPageNumberPagination

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "id",
            required=True,
            location="path",
            description='Specify an office to get all events under that entity',
            schema=coreschema.String()
        ),
        coreapi.Field(
            name='host_query',
            required=False,
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            type='integer'
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
    ])

    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Event.objects.approved_events_only().filter(sanggu_hosts__pk=pk)
        
        queryset = tags_hostgroup_filter(queryset, self.request, host_map)

        return queryset

class EventList(APIView):
    """
    get: List all the events, ordered by start_time.
    post: Create a new event.
    """ 

    queryset = Event.objects.all()
    serializer_class = event_serializer.CreateEventSerializer
    # specifies which pagination settings to follow
    filter_backends = [SearchFilter, OrderingFilter, SimpleFilterBackend]
    # search_fields = ['name', 'venue__name', 'org_hosts__name', 'sanggu_hosts__name', 'office_hosts__name']
    authentication_classes = [MyJWTAuthentication,]

    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "search",
            required=False,
            location="query",
            description='A search term for events with the given name, venue, or host.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "tags",
            required=False,
            location="query",
            description='Specify tag IDs (separated by commas) to get all events with any of the tags specified.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "host",
            required=False,
            location="query",
            description='Specify a host id to get all events under that entity',
            schema=coreschema.Integer()
        ),
        coreapi.Field(
            "date",
            required=False,
            location="query",
            description='Specify a date in YYYY-MM-DD to get all the events held on that date.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "week",
            required=False,
            location="query",
            description='Specify a date in YYYY-MM-DD to get all the events held in the same week.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "month",
            required=False,
            location="query",
            description='Specify a date in YYYY-MM-DD or in MM-YYYY to get all the events held in the same month.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "start_date",
            required=False,
            location="query",
            description='Specify a date in YYYY-MM-DD as the start of the range of dates.',
            schema=coreschema.String()
        ),
        coreapi.Field(
            "end_date",
            required=False,
            location="query",
            description='Specify a date in YYYY-MM-DD as the end of the range of dates, inclusive.',
            schema=coreschema.String()
        ),
    ])

    def get(self, request, format=None):
        # search_fields = ['name', 'venue__name', 'org_hosts__name', 'sanggu_hosts__name', 'office_hosts__name']
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()
        events = Event.objects.approved_events_only().filter(event_logistics__date__gte=timezone.now()).order_by('first_date')
        # for event in events:
        #     event.event_logistics = event.event_logistics.filter(id__in=logistic_ids)
        host_query = self.request.GET.get("host_query")
        tags = self.request.GET.get("tags")
        search = self.request.GET.get("search")
        date = self.request.GET.get("date")
        week = self.request.GET.get("week")
        month = self.request.GET.get("month")
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")
        host = self.request.GET.get("host")

        if host_query:
            events = events.filter(host_map[host_query]).distinct()

        if search:
            events = events.filter(
                Q(name__icontains=search) |
                Q(event_logistics__venue__name__icontains=search) | 
                Q(event_logistics__outside_venue_name__icontains=search) | 
                Q(org_hosts__name__icontains=search) |
                Q(sanggu_hosts__name__icontains=search) |
                Q(office_hosts__name__icontains=search) |
                Q(org_hosts__abbreviation__icontains=search) |
                Q(sanggu_hosts__abbreviation__icontains=search) |
                Q(office_hosts__abbreviation__icontains=search)
            ).distinct()

        if tags:
            tags_list = tags.split(',')
            queries = Q()
            for tag in tags_list:
                queries = queries | Q(tags__pk=tag)

            events = events.filter(queries).distinct()

        if date:
            events = events.filter(event_logistics__date=date).order_by('first_date')  

        if week:
            get_date = datetime.strptime(week, '%Y-%m-%d')
            get_day = get_date.weekday()
            start_week_date = (get_date - timedelta(days=get_day))
            end_week_date = (get_date + timedelta(days=(6-get_day)))
            end_week_date = end_week_date + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)
            events = get_dates_between(start_week_date, end_week_date, events, Event.event_logistics)

        if month:
            try:
                get_month = datetime.strptime(month, '%Y-%m-%d').date().month
                get_year = datetime.strptime(month, '%Y-%m-%d').date().year
            except ValueError:
                date_list = month.split("-")
                get_month = date_list[0]
                get_year = date_list[1]
            
            events = events.filter(event_logistics__date__month=get_month, event_logistics__date__year=get_year).order_by('first_date')

        if start_date or end_date:
            if end_date:
                end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)
            events = get_dates_between(start_date, end_date, events, Event.event_logistics)

        if host:
            try:
                host_pk = int(host)
                if OrgHost.objects.filter(pk=host_pk).exists():
                    events = events.filter(org_hosts__pk=host)
                elif SangguHost.objects.filter(pk=host_pk).exists():
                    events = events.filter(sanggu_hosts__pk=host)
                elif OfficeHost.objects.filter(pk=host_pk).exists():
                    events = events.filter(office_hosts__pk=host)
            except ValueError:
                pass

        if request.method == 'GET' and 'page' in request.GET:
            page = paginator.paginate_queryset(events, request)
            serializer = event_serializer.EventSerializer(page, many=True)
        
            return paginator.get_paginated_response(serializer.data)

        else:
            serializer = event_serializer.EventSerializer(events, many=True)
            return Response({"results" : serializer.data})

    def post(self, request, format=None):
        serializer = event_serializer.CreateEventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get: 
    Returns an event given its id
    
    put:
    Updates an event given its id

    patch:
    Updates an event given its id

    delete:
    Deletes an event given its id
    """
    serializer_class = event_serializer.EventSerializer
    authentication_classes = [MyJWTAuthentication,]
    permission_classes = [IsAuthenticatedOrReadOnly, IsEventHostOrReadOnly]

    def get_queryset(self):
        # pk = self.kwargs['pk']
        queryset = Event.objects.approved_events(self.request.user)

        # if self.request.user.is_authenticated:
        #     user = self.request.user
        #     queryset = queryset.filter(Q(is_approved=True) | Q(sanggu_hosts__user=user) | Q(org_hosts__user=user) | Q(office_hosts__user=user))
        # else:
        #     queryset = queryset.filter(is_approved=True)

        return queryset

class UnapprovedEventList(generics.ListAPIView):
    """
    get: Gets all the unapproved events of the authenticated user.
    """
    serializer_class = event_serializer.EventSerializer
    authentication_classes = [MyJWTAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(Q(is_approved=False) & (Q(sanggu_hosts__user=user) | Q(org_hosts__user=user) | Q(office_hosts__user=user))).order_by('first_date')

class EventLogisticCreate(APIView):
    """
    get: Gets the details of an event given the id.
    post: Create a detail for one event (start_time, end_time, venue) given the event id.
    """
    serializer_class = event_serializer.EventLogisticSerializer
    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "id",
            required=True,
            location="path",
            description='Specify the id of an event to create a logistic detail.',
            schema=coreschema.Integer()
        ),
    ])
    authentication_classes = [MyJWTAuthentication,]
    permission_classes = [IsAuthenticatedOrReadOnly, IsEventHostOrReadOnly,]

    def get_object(self, pk):
        try:
            user = self.request.user
            return Event.objects.approved_events(user).get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        event = self.get_object(pk)
        serializer = event_serializer.EventSerializer(event)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        data = request.data.copy()
        data["event"] = str(pk)
        serializer = event_serializer.EventLogisticSaveSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)