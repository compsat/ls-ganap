from django.contrib import admin
from .models import Cluster, EventHost, Event, Tag, Venue

class HostInline(admin.TabularInline):
    model = EventHost
    fields = ('name', 'accredited')

class EventInline(admin.TabularInline):
    model = Event.tags.through

class EventAdmin(admin.ModelAdmin):
	filter_horizontal = ('tags',)
	list_display = ('name', 'host_id', 'venue_id', 'start_time', 'is_accepted')
	list_filter = ('host_id__name', 'is_accepted', 'start_time')
	autocomplete_fields = ['host_id']
	actions = ['accept_events']

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

admin.site.register(Cluster, ClusterAdmin)
admin.site.register(EventHost, EventHostAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Venue)
