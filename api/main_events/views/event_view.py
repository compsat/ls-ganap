from main_events.models import Event, EventLogistic
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
from main_events.helper_methods import get_dates_between
from rest_framework.schemas import AutoSchema
import coreapi, coreschema
from django.utils import timezone
from django.db.models import Min
from rest_framework.permissions import IsAuthenticated, AllowAny
from main_events.jwt_authentication import MyJWTAuthentication

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
    ])

    def get_queryset(self):
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)

        queryset = Event.objects.all()

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
    ])

    def get_queryset(self):
        date = self.kwargs['date']
        queryset = Event.objects.all()
        
        if date is not None:
            queryset = queryset.filter(is_accepted=True, event_logistics__date=date).annotate(date=Min('event_logistics__date')).order_by('date')

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
    ])

    def get_queryset(self):
        date = self.kwargs['date']
        get_date = datetime.strptime(date, '%Y-%m-%d')
        get_day = get_date.weekday()
        start_date = (get_date - timedelta(days=get_day))
        end_date = (get_date + timedelta(days=(6-get_day)))
        end_date = end_date + timedelta(hours=23, minutes=59, seconds=59, milliseconds=59)

        queryset = Event.objects.all()

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

        queryset = Event.objects.annotate(date=Min('event_logistics__date'))

        if date is not None:
            queryset = queryset.filter(is_accepted=True, event_logistics__date__month=get_month, event_logistics__date__year=get_year).order_by('date')

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
    ])

    def get(self, request, format=None):
        # search_fields = ['name', 'venue__name', 'org_hosts__name', 'sanggu_hosts__name', 'office_hosts__name']
        pagination_class = ObjectPageNumberPagination
        paginator = pagination_class()
        events = Event.objects.filter(is_accepted=True, event_logistics__date__gte=timezone.now()).annotate(date=Min('event_logistics__date')).order_by('date')
        # for event in events:
        #     event.event_logistics = event.event_logistics.filter(id__in=logistic_ids)
        query = self.request.GET.get("host_type")
        search = self.request.GET.get("search")

        if query:
            if query == 'sanggu':
                events = events.filter(
                    Q(sanggu_hosts__isnull=False)
                ).distinct()
            elif query == 'office':
                events = events.filter(
                    Q(office_hosts__isnull=False)
                ).distinct()
            elif query == 'org':
                events = events.filter(
                    Q(org_hosts__isnull=False)
                ).distinct()

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
            )

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

# class EventDetail(generics.RetrieveUpdateDestroyAPIView):
#     """
#     get: 
#     Returns an event given its id
    
#     put:
#     Updates an event given its id

#     patch:
#     Updates an event given its id

#     delete:
#     Deletes an event given its id
#     """
#     queryset = Event.objects.filter(is_accepted=True)
#     serializer_class = event_serializer.EventSerializer

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
    # queryset = Event.objects.filter(is_accepted=True)
    serializer_class = event_serializer.EventSerializer
    authentication_classes = [MyJWTAuthentication,]

    def get_queryset(self):
        # pk = self.kwargs['pk']
        queryset = Event.objects.annotate(date=Min('event_logistics__date'))

        if self.request.user.is_authenticated:
            user = self.request.user
            queryset = queryset.filter(Q(is_accepted=True) | Q(sanggu_hosts__user=user) | Q(org_hosts__user=user))
        else:
            queryset = queryset.filter(is_accepted=True)

        return queryset

class UnapprovedEventsList(generics.ListAPIView):
    serializer_class = event_serializer.EventSerializer
    authentication_classes = [MyJWTAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.annotate(date=Min('event_logistics__date')).filter(Q(is_accepted=False) & (Q(sanggu_hosts__user=user) | Q(org_hosts__user=user)))

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

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
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