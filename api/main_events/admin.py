from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from .models import User

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

	# readonly_fields = ('is_accepted', 'event_logistics',)

	# def is_accepted(self, obj):
	# 	print(obj.is_accepted)
	# 	return obj.event_list.get(pk=1).is_accepted
	# is_accepted.short_description = 'is_accepted'

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

class EventAdmin(admin.ModelAdmin):
	filter_horizontal = ('tags', 'org_hosts', 'office_hosts', 'sanggu_hosts')
	# list_display = ('name', 'host', 'venue', 'start_time', 'is_accepted')
	list_display = ('name', 'is_accepted')
	# list_filter = ('host__name', 'is_accepted', 'start_time')
	list_filter = ('is_accepted',)
	fields = ('deleted_at', 'name', 'description', 'is_accepted', 'poster_url', 'is_premium', 'event_url', 'tags', 'sanggu_hosts', 'office_hosts', 'org_hosts')
	readonly_fields = ('deleted_at',)
	actions = ['accept_events']
	inlines = [EventLogisticInline,]

	def accept_events(self, request, queryset):
		events_updated = queryset.update(is_accepted=True)

		if events_updated == 1:
			message_bit = "1 event was"
		else:
			message_bit = "%s events were" % rows_updated
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
