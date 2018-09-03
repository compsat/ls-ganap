from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from .models import User, OrgHost, SangguHost, OfficeHost
from django.utils import timezone
from django.db.models import Min, Q
from django.utils.safestring import mark_safe

@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

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

class EventForSangguInline(admin.TabularInline):
    model = Event.sanggu_hosts.through

class EventForOrgInline(admin.TabularInline):
	model = Event.org_hosts.through

	# readonly_fields = ('is_approved', 'event_logistics',)

	# def is_approved(self, obj):
	# 	print(obj.is_approved)
	# 	return obj.event_list.get(pk=1).is_approved
	# is_approved.short_description = 'is_approved'

	# def event_logistics(self, obj):
	# 	print(obj.event_logistics.get(pk=1).date)
	# 	return obj.event_list.get(pk=1).event_logistics.get(pk=1).date
	# event_logistics.short_description = 'event_logistics'

class EventForOfficeInline(admin.TabularInline):
    model = Event.office_hosts.through

class EventLogisticInline(admin.TabularInline):
    model = EventLogistic

class EventVenueInline(admin.TabularInline):
	model = EventLogistic
	readonly_fields = ('event', 'event_host', 'start_time', 'end_time')
	exclude = ('outside_venue_name',)

	def event_host(self, obj):
		return obj.event.host

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
	fields = ('deleted_at', 'name', 'description', 'is_approved', 'poster_url', 'is_premium', 'event_url', 'tags', 'sanggu_hosts', 'office_hosts', 'org_hosts')
	readonly_fields = ('deleted_at',)
	actions = ['accept_events']
	inlines = [EventLogisticInline,]

	def get_queryset(self, request):
		qs = super(EventAdmin, self).get_queryset(request)
		qs = qs.annotate(first_date=Min('event_logistics__date', filter=Q(event_logistics__date__gte=timezone.now())))
		return qs

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

	def accept_events(self, request, queryset):
		events_updated = queryset.update(is_approved=True)

		if events_updated == 1:
			message_bit = "1 event was"
		else:
			message_bit = "%s events were" % events_updated
		self.message_user(request, "%s successfully marked as accepted." % message_bit)
	accept_events.short_description = "Mark events as accepted"

class EventHostAdmin(admin.ModelAdmin):
	list_display = ('name',)	
	search_fields = ['name']
	inlines = [
		SangguInline,
		OfficeInline,
		OrgInline,
	]

class SangguHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'abbreviation', 'event_host')
	list_filter = ('event_host',)
	search_fields = ['name', 'abbreviation']
	fields = ('name', 'abbreviation', 'description', 'color', 'logo_url', 'event_host')
	inlines = [EventForSangguInline]

class OfficeHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'abbreviation', 'event_host')
	list_filter = ('event_host',)
	search_fields = ['name', 'abbreviation']
	fields = ('name', 'abbreviation', 'description', 'color', 'logo_url', 'event_host')
	inlines = [EventForOfficeInline]

class OrgHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'abbreviation', 'event_host', 'org_type', 'cluster')
	list_filter = ('event_host', 'org_type', 'cluster')
	search_fields = ['name', 'abbreviation']
	fields = ('name', 'abbreviation', 'description', 'color', 'logo_url', 'event_host', 'org_type', 'cluster')
	inlines = [EventForOrgInline]


class ClusterAdmin(admin.ModelAdmin):
	inlines = [
		OrgInline,
	]

class TagAdmin(admin.ModelAdmin):
	inlines = [
		EventInline,
	]

class VenueAdmin(admin.ModelAdmin):
	inlines = [
		EventVenueInline,
	]

class OrgTypeAdmin(admin.ModelAdmin):
	inlines = [
		OrgInline,
	]

admin.site.register(Cluster, ClusterAdmin)
admin.site.register(EventHost, EventHostAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Venue, VenueAdmin)
admin.site.register(SangguHost, SangguHostAdmin)
admin.site.register(OfficeHost, OfficeHostAdmin)
admin.site.register(OrgHost, OrgHostAdmin)
admin.site.register(OrgType, OrgTypeAdmin)
# admin.site.register(Venue)
