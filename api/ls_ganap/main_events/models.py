from django.db import models
from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from django.utils import timezone

class SoftDeletionQuerySet(QuerySet):
    def delete(self):
        return super(SoftDeletionQuerySet, self).update(deleted_at=timezone.now())

    def hard_delete(self):
        return super(SoftDeletionQuerySet, self).delete()

    def alive(self):
        return self.filter(deleted_at=None)

    def dead(self):
        return self.exclude(deleted_at=None)

class SoftDeletionManager(models.Manager):
    def __init__(self, *args, **kwargs):
        self.alive_only = kwargs.pop('alive_only', True)
        super(SoftDeletionManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        if self.alive_only:
            return SoftDeletionQuerySet(self.model).filter(deleted_at=None)
        return SoftDeletionQuerySet(self.model)

    def hard_delete(self):
        return self.get_queryset().hard_delete()

class SoftDeletionModel(models.Model):
	name = models.CharField(max_length=200)
	deleted_at = models.DateTimeField(blank=True, null=True)

	objects = SoftDeletionManager()
	all_objects = SoftDeletionManager(alive_only=False)

	class Meta:
		abstract = True

	def __str__(self):
		return self.name

	def delete(self):
		self.deleted_at = timezone.now()
		self.save()

	def hard_delete(self):
		super(SoftDeletionModel, self).delete()

class HostType(models.Model):
	type_name = models.CharField(max_length=20)

	def __str__(self):
		return self.type_name

class EventHost(models.Model):
	name = models.CharField(max_length=200)
	host_type = models.ForeignKey(HostType, on_delete=models.DO_NOTHING)
	abreviation = models.CharField(max_length=10, blank=True)
	description = models.TextField()
	color = models.CharField(max_length=20)
	logo_url = models.URLField()

	def __str__(self):
		return self.name

class Cluster(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField()
	logo_url = models.URLField()

class Venue(SoftDeletionModel):
	pass

class Event(SoftDeletionModel):
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
        
class Tag(SoftDeletionModel):
	pass

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