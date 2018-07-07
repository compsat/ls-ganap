from django.db import models
from django.contrib.auth.models import User

class HostType(models.Model):
	type_name = models.CharField(max_length=20)

class EventHost(models.Model):
	name = models.CharField(max_length=200)
	host_type = models.ForeignKey(HostType, on_delete=models.DO_NOTHING)
	description = models.TextField()
	color = models.CharField(max_length=20)
	logo_url = models.URLField()

class Venue(models.Model):
	name = models.CharField(max_length=200)

class Event(models.Model):
	venue_id = models.ForeignKey(Venue, null=True, on_delete=models.SET_NULL)
	host_id = models.ForeignKey(EventHost, on_delete=models.CASCADE)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()
	name = models.CharField(max_length=200)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_accepted = models.BooleanField(default=False)
	poster_url = models.URLField()
	outside_venue_name = models.CharField(max_length=200, blank=True)
	is_premium = models.BooleanField(default=False)
	event_url = models.URLField()
        
class Tag(models.Model):
	name = models.CharField(max_length=50)

class TagToEvent(models.Model):
	tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)
	event_id = models.ForeignKey(Event, on_delete=models.CASCADE)
	
class TagSubscription(models.Model):
	user_id = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)
	
class EventHostSubscription(models.Model):
	user_id = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	event_host_id = models.ForeignKey(EventHost, on_delete=models.CASCADE)
	
class FollowedEvents(models.Model):
	user_id = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	event_id = models.ForeignKey(Event, on_delete=models.CASCADE)