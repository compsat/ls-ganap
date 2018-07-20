from django.db import models
from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from django.utils import timezone
from main_events.soft_deletion_model import SoftDeletionModel

class HostType(models.Model):
	type_name = models.CharField(max_length=20)

	def __str__(self):
		return self.type_name

class Cluster(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField()
	logo_url = models.URLField()

	def __str__(self):
		return self.name

class EventHost(models.Model):
	name = models.CharField(max_length=200)
	host_type = models.ForeignKey(HostType, related_name='host_list', on_delete=models.DO_NOTHING)
	cluster = models.ForeignKey(Cluster, blank=True, related_name='org_list', on_delete=models.DO_NOTHING)
	abbreviation = models.CharField(max_length=10, blank=True)
	description = models.TextField()
	accredited = models.BooleanField(default=False)
	color = models.CharField(max_length=20)
	logo_url = models.URLField()

	def __str__(self):
		return self.name

class Venue(SoftDeletionModel):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name
		
class Tag(SoftDeletionModel):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

class Event(SoftDeletionModel):
	name = models.CharField(max_length=200)
	venue_id = models.ForeignKey(Venue, null=True, on_delete=models.SET_NULL)
	host_id = models.ForeignKey(EventHost, on_delete=models.CASCADE)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_accepted = models.BooleanField(default=False)
	poster_url = models.URLField()
	outside_venue_name = models.CharField(max_length=200, blank=True)
	is_premium = models.BooleanField(default=False)
	event_url = models.URLField()
	tags = models.ManyToManyField(Tag, related_name="event_list")

	def __str__(self):
		return self.name

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