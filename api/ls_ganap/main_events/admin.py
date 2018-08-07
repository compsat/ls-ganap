from django.contrib import admin
from .models import Cluster, EventHost, Event, EventLogistic, Tag, Venue
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

class HostInline(admin.TabularInline):
    model = EventHost
    fields = ('name', 'accredited')

class EventInline(admin.TabularInline):
    model = Event.tags.through

class EventLogisticInline(admin.TabularInline):
    model = EventLogistic

class EventVenueInline(admin.TabularInline):
	model = EventLogistic
	readonly_fields = ('event', 'event_host', 'start_time', 'end_time')

	def event_host(self, obj):
		return obj.event.host

class EventAdmin(admin.ModelAdmin):
	filter_horizontal = ('tags',)
	# list_display = ('name', 'host', 'venue', 'start_time', 'is_accepted')
	list_display = ('name', 'host', 'is_accepted')
	# list_filter = ('host__name', 'is_accepted', 'start_time')
	list_filter = ('host__name', 'is_accepted')
	autocomplete_fields = ['host']
	fields = ('deleted_at', 'name', 'host', 'description', 'is_accepted', 'poster_url', 'outside_venue_name', 'is_premium', 'event_url', 'tags')
	readonly_fields = ('deleted_at',)
	actions = ['accept_events']
	inlines = [EventLogisticInline]

	def accept_events(self, request, queryset):
		events_updated = queryset.update(is_accepted=True)

		if events_updated == 1:
			message_bit = "1 event was"
		else:
			message_bit = "%s events were" % rows_updated
		self.message_user(request, "%s successfully marked as accepted." % message_bit)
	accept_events.short_description = "Mark events as accepted"

class EventHostAdmin(admin.ModelAdmin):
	list_display = ('name', 'host_type', 'cluster')	
	list_filter = ('host_type__type_name', 'cluster__name')
	search_fields = ['name']

class ClusterAdmin(admin.ModelAdmin):
	inlines = [
		HostInline,
	]

class TagAdmin(admin.ModelAdmin):
	inlines = [
		EventInline,
	]

class VenueAdmin(admin.ModelAdmin):
	inlines = [
		EventVenueInline,
	]

admin.site.register(Cluster, ClusterAdmin)
admin.site.register(EventHost, EventHostAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Venue, VenueAdmin)
# admin.site.register(Venue)
