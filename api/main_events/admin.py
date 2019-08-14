from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.db.models import Min, Q, FieldDoesNotExist
from django.utils.safestring import mark_safe
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import include, path, resolve
from django.http import HttpResponseRedirect
from django.shortcuts import redirect

class UserOrgInline(admin.StackedInline):
	model = OrgHost

class UserOfficeInline(admin.StackedInline):
	model = OfficeHost

class UserSangguInline(admin.StackedInline):
	model = SangguHost

class HostTypeFilter(admin.SimpleListFilter):
    # Human-readable title which will be displayed in the
    # right admin sidebar just above the filter options.
    title = _('host type')

    # Parameter for the filter that will be used in the URL query.
    parameter_name = 'type'

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element in each
        tuple is the coded value for the option that will
        appear in the URL query. The second element is the
        human-readable name for the option that will appear
        in the right sidebar.
        """
        return (
            ('org', _('Org')),
            ('office', _('Office')),
            ('sanggu', _('Sanggu')),
        )

    def queryset(self, request, queryset):
        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        # Compare the requested value (either '80s' or '90s')
        # to decide how to filter the queryset.
        if self.value() == 'org':
            return queryset.exclude(org_host=None)
        if self.value() == 'office':
            return queryset.exclude(office_host=None)
        if self.value() == 'sanggu':
            return queryset.exclude(sanggu_host=None)

@admin.register(User)
class UserAdmin(DjangoUserAdmin):
	"""Define admin model for custom User model with no email field."""

	fieldsets = (
		(None, {'fields': ('email', 'password')}),

	)
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'password1', 'password2'),
		}),
	)
	list_filter = (HostTypeFilter, 'is_staff', 'is_superuser', 'is_active')
	list_display = ('email', 'host_type', 'host_name', 'is_staff')
	search_fields = ('email',)
	ordering = ('email',)

	def host_name(self, obj):
		if hasattr(obj, 'org_host'):
			return obj.org_host.name
		elif hasattr(obj, 'office_host'):
			return obj.office_host.name
		elif hasattr(obj, 'sanggu_host'):
			return obj.sanggu_host.name

		return ''

	def host_type(self, obj):
		if hasattr(obj, 'org_host'):
			return 'Org'
		elif hasattr(obj, 'office_host'):
			return 'Office'
		elif hasattr(obj, 'sanggu_host'):
			return 'Sanggu'

		return ''

	def add_org_view(self, request, extra_content=None):
		self.inlines = [UserOrgInline]
		return super(UserAdmin, self).add_view(request)

	def add_office_view(self, request, extra_content=None):
		self.inlines = [UserOfficeInline]
		return super(UserAdmin, self).add_view(request)

	def add_sanggu_view(self, request, extra_content=None):
		self.inlines = [UserSangguInline]
		return super(UserAdmin, self).add_view(request)

	def change_view(self, request, object_id, extra_content=None):
		object_id = resolve(request.path).kwargs['object_id']
		user = User.objects.get(pk=object_id)
		self.inlines = []
		if hasattr(user, 'org_host'):
			self.inlines = [UserOrgInline]
		elif hasattr(user, 'office_host'):
			self.inlines = [UserOfficeInline]
		elif hasattr(user, 'sanggu_host'):
			self.inlines = [UserSangguInline]

		return super(UserAdmin, self).change_view(request, object_id)

	def get_urls(self):
		urls = super(UserAdmin, self).get_urls()
		urls[2] = path("add/org/", self.add_org_view, name='main_events_user_add')
		custom_urls = [
			path('add/office/', self.add_office_view, name='main_events_user_add_office'),
			path('add/sanggu/', self.add_sanggu_view, name='main_events_user_add_sanggu')
		]
		return custom_urls + urls

class SangguInline(admin.TabularInline):
	model = SangguHost
	fields = ('name', 'abbreviation',)

class OfficeInline(admin.TabularInline):
	model = OfficeHost
	fields = ('name', 'abbreviation',)

class OrgInline(admin.TabularInline):
    model = OrgHost
    fields = ('name', 'abbreviation', 'event_host', 'org_type', 'cluster')

class EventInline(admin.TabularInline):
	model = Event.tags.through

	readonly_fields = ('is_approved', 'event_logistics',)

	def is_approved(self, obj):
		return Event.objects.get(pk=obj.event_id).is_approved
	is_approved.short_description = 'Is approved'

	def event_logistics(self, obj):
		dates = ""
		count = 0
		logistics = Event.objects.get(pk=obj.event_id).event_logistics.annotate(earliest=Min('date')).all()
		if logistics.exists():
			for logistic in logistics:
				dates += logistic.date.strftime('%B %d, %Y')
				count += 1
				if count == 3:
					dates += "..."
					break
				else:
					dates += "<br>"
		else:
			return "FINISHED"

		return mark_safe(dates)
	event_logistics.short_description = 'Event Dates'

class EventForSangguInline(admin.TabularInline):
	model = Event.sanggu_hosts.through
	readonly_fields = ('is_approved', 'event_logistics',)

	def is_approved(self, obj):
		return Event.objects.get(pk=obj.event_id).is_approved
	is_approved.short_description = 'Is approved'

	def event_logistics(self, obj):
		dates = ""
		count = 0
		logistics = Event.objects.get(pk=obj.event_id).event_logistics.annotate(earliest=Min('date')).all()
		if logistics.exists():
			for logistic in logistics:
				dates += logistic.date.strftime('%B %d, %Y')
				count += 1
				if count == 3:
					dates += "..."
					break
				else:
					dates += "<br>"
		else:
			return "FINISHED"

		return mark_safe(dates)
	event_logistics.short_description = 'Event Dates'

	def get_ordering(self, request):
		return ['event__event_logistics']

class EventForOrgInline(admin.TabularInline):
	model = Event.org_hosts.through

	readonly_fields = ('is_approved', 'event_logistics',)

	def is_approved(self, obj):
		return Event.objects.get(pk=obj.event_id).is_approved
	is_approved.short_description = 'Is approved'

	def event_logistics(self, obj):
		dates = ""
		count = 0
		logistics = Event.objects.get(pk=obj.event_id).event_logistics.annotate(earliest=Min('date')).all()
		if logistics.exists():
			for logistic in logistics:
				dates += logistic.date.strftime('%B %d, %Y')
				count += 1
				if count == 3:
					dates += "..."
					break
				else:
					dates += "<br>"
		else:
			return "FINISHED"

		return mark_safe(dates)
	event_logistics.short_description = 'Event Dates'

class EventForOfficeInline(admin.TabularInline):
	model = Event.office_hosts.through

	readonly_fields = ('is_approved', 'event_logistics',)

	def is_approved(self, obj):
		return Event.objects.get(pk=obj.event_id).is_approved
	is_approved.short_description = 'Is approved'

	def event_logistics(self, obj):
		dates = ""
		count = 0
		logistics = Event.objects.get(pk=obj.event_id).event_logistics.annotate(earliest=Min('date')).all()
		if logistics.exists():
			for logistic in logistics:
				dates += logistic.date.strftime('%B %d, %Y')
				count += 1
				if count == 3:
					dates += "..."
					break
				else:
					dates += "<br>"
		else:
			return "FINISHED"

		return mark_safe(dates)
	event_logistics.short_description = 'Event Dates'

class EventLogisticInline(admin.TabularInline):
    model = EventLogistic

class EventVenueInline(admin.TabularInline):
	model = EventLogistic
	readonly_fields = ('event', 'event_hosts', 'start_time', 'end_time')
	exclude = ('outside_venue_name',)

	def event_hosts(self, obj):
		event = obj.event
		hosts = ""
		for host in event.org_hosts.all():
			hosts += host.name + "<br>"

		for host in event.office_hosts.all():
			hosts += host.name + "<br>"

		for host in event.sanggu_hosts.all():
			hosts += host.name + "<br>"

		return mark_safe(hosts)

class HasHappenedListFilter(admin.SimpleListFilter):
    # Human-readable title which will be displayed in the
    # right admin sidebar just above the filter options.
    title = _('event status')

    # Parameter for the filter that will be used in the URL query.
    parameter_name = 'status'

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element in each
        tuple is the coded value for the option that will
        appear in the URL query. The second element is the
        human-readable name for the option that will appear
        in the right sidebar.
        """
        return (
            ('finished', _('Finished event')),
            ('future', _('Future or ongoing event')),
        )

    def queryset(self, request, queryset):
        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        # Compare the requested value (either '80s' or '90s')
        # to decide how to filter the queryset.
        if self.value() == 'finished':
            return queryset.exclude(event_logistics__date__gte=timezone.now())
        if self.value() == 'future':
            return queryset.filter(event_logistics__date__gte=timezone.now())

class EventAdmin(admin.ModelAdmin):
	filter_horizontal = ('tags', 'org_hosts', 'office_hosts', 'sanggu_hosts')
	list_display = ('name', 'hosts', 'event_dates', 'is_approved')
	list_filter = ('is_approved', HasHappenedListFilter, 'org_hosts', 'office_hosts', 'sanggu_hosts')
	fields = ('deleted_at', 'created_at', 'updated_at', 'name', 'description', 'is_approved', 'poster_url', 'is_premium', 'event_url', 'tags', 'sanggu_hosts', 'office_hosts', 'org_hosts')
	readonly_fields = ('deleted_at', 'created_at', 'updated_at',)
	search_fields = ('name', 'org_hosts__name', 'office_hosts__name', 'sanggu_hosts__name', 'org_hosts__abbreviation', 'office_hosts__abbreviation', 'sanggu_hosts__abbreviation')
	actions = ['accept_events']
	inlines = [EventLogisticInline,]

	def get_ordering(self, request):
		return ['first_date']

	def hosts(self, obj):
		hosts = ""
		for host in obj.org_hosts.all():
			hosts += host.name + "<br>"

		for host in obj.office_hosts.all():
			hosts += host.name + "<br>"

		for host in obj.sanggu_hosts.all():
			hosts += host.name + "<br>"

		return mark_safe(hosts)

	def event_dates(self, obj):
		dates = ""
		count = 0
		future_logistics = obj.event_logistics.filter(date__gte=timezone.now()).annotate(earliest=Min('date')).all()
		if future_logistics.exists():
			for logistic in future_logistics:
				dates += logistic.date.strftime('%B %d, %Y')
				count += 1
				if count == 3:
					dates += "..."
					break
				else:
					dates += "<br>"
		else:
			return "FINISHED"

		return mark_safe(dates)
	event_dates.short_description = 'Event Dates After Today'

	def accept_events(self, request, queryset):
		for obj in queryset:
			obj.is_approved = True
			obj.save()

		if len(queryset) == 1:
			message_bit = "1 event was"
		else:
			message_bit = "%s events were" % len(queryset)
		self.message_user(request, "%s successfully marked as approved." % message_bit)
	accept_events.short_description = "Mark events as approved"

class EventHostAdmin(admin.ModelAdmin):
	list_display = ('name',)	
	search_fields = ['name']

	def add_view(self, request, extra_content=None):
		self.inlines = []
		return super(EventHostAdmin, self).add_view(request)

	def change_view(self, request, object_id, extra_content=None):
		self.inlines = [
			SangguInline,
			OfficeInline,
			OrgInline,
		]
		return super(EventHostAdmin, self).change_view(request, object_id)

class SangguHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'abbreviation')
	search_fields = ['name', 'abbreviation']
	fields = ('name', 'abbreviation', 'description', 'color', 'logo_url', 'event_host', 'user')
	inlines = [EventForSangguInline]

	def has_add_permission(self, request, obj=None):
		return False

class OfficeHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'abbreviation')
	# list_filter = ('event_host',)
	search_fields = ['name', 'abbreviation']
	fields = ('name', 'abbreviation', 'description', 'color', 'logo_url', 'event_host', 'user')
	inlines = [EventForOfficeInline]

	def has_add_permission(self, request, obj=None):
		return False

class OrgHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'abbreviation', 'cluster')
	list_filter = ('event_host', 'org_type', 'cluster')
	search_fields = ['name', 'abbreviation']
	fields = ('name', 'abbreviation', 'description', 'color', 'logo_url', 'event_host', 'org_type', 'cluster', 'user')
	inlines = [EventForOrgInline]

	def has_add_permission(self, request, obj=None):
		return False

class ClusterAdmin(admin.ModelAdmin):
	def add_view(self, request, extra_content=None):
		self.inlines = []
		return super(ClusterAdmin, self).add_view(request)

	def change_view(self, request, object_id, extra_content=None):
		self.inlines = [OrgInline]
		return super(ClusterAdmin, self).change_view(request, object_id)

class TagAdmin(admin.ModelAdmin):
	search_fields = ['name',]
	inlines = [
		EventInline,
	]

class VenueAdmin(admin.ModelAdmin):
	search_fields = ['name',]
	inlines = []
	readonly_fields = ['deleted_at']

	def add_view(self, request, extra_content=None):
		self.inlines = []
		return super(VenueAdmin, self).add_view(request)

	def change_view(self, request, object_id, extra_content=None):
		self.inlines = [EventVenueInline]
		return super(VenueAdmin, self).change_view(request, object_id)

class OrgTypeAdmin(admin.ModelAdmin):
	def add_view(self, request, extra_content=None):
		self.inlines = []
		return super(OrgTypeAdmin, self).add_view(request)

	def change_view(self, request, object_id, extra_content=None):
		self.inlines = [OrgInline]
		return super(OrgTypeAdmin, self).change_view(request, object_id)

admin.site.register(Cluster, ClusterAdmin)
admin.site.register(EventHost, EventHostAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Venue, VenueAdmin)
admin.site.register(SangguHost, SangguHostAdmin)
admin.site.register(OfficeHost, OfficeHostAdmin)
admin.site.register(OrgHost, OrgHostAdmin)
admin.site.register(OrgType, OrgTypeAdmin)