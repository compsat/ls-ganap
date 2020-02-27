from django.db import models
from django.db.models.query import QuerySet
from django.utils import timezone
from main_events.soft_deletion_model import *
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from cloudinary.models import CloudinaryField
from django.db.models import Min, Q, Case, Count, When
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """User model."""

    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

class OrgType(models.Model):
	name = models.CharField(max_length=50)
	abbreviation = models.CharField(max_length=3)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class Cluster(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField()
	abbreviation = models.CharField(max_length=30, blank=True)
	logo_url = models.ImageField(upload_to='images/', blank=True)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class EventHost(models.Model):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class SangguHost(models.Model):	
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='sanggu_host', blank=True, null=True)
	name = models.CharField(max_length=200)
	abbreviation = models.CharField(max_length=30, blank=True)
	description = models.TextField()
	color = models.CharField(max_length=20)
	logo_url = models.ImageField(upload_to='images/', blank=True)
	event_host = models.ForeignKey(EventHost, blank=True, related_name='sanggu_list', on_delete=models.DO_NOTHING)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class OfficeHost(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='office_host', blank=True, null=True)
	name = models.CharField(max_length=200)
	abbreviation = models.CharField(max_length=30, blank=True)
	description = models.TextField()
	color = models.CharField(max_length=20)
	logo_url = models.ImageField(upload_to='images/', blank=True)
	event_host = models.ForeignKey(EventHost, blank=True, related_name='office_list', on_delete=models.DO_NOTHING)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class OrgHost(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='org_host', blank=True, null=True)
	name = models.CharField(max_length=200)
	abbreviation = models.CharField(max_length=30, blank=True)
	description = models.TextField()
	color = models.CharField(max_length=20)
	logo_url = models.ImageField(upload_to='images/', blank=True)
	event_host = models.ForeignKey(EventHost, blank=True, related_name='org_list', on_delete=models.DO_NOTHING)
	org_type = models.ForeignKey(OrgType, blank=True, related_name='org_list', on_delete=models.DO_NOTHING)
	cluster = models.ForeignKey(Cluster, blank=True, null=True, related_name='org_list', on_delete=models.DO_NOTHING)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class Venue(SoftDeletionModel):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)
		
class Tag(models.Model):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class EventManager(SoftDeletionManager):
	def get_queryset(self):
		return super(EventManager, self).get_queryset().annotate(first_date=Min('event_logistics__date', filter=Q(event_logistics__date__gte=timezone.now())))

	def by_first_date(self): 
		qs = super(EventManager, self).get_queryset() 
		return qs.order_by('first_date')

	def approved_events_only(self):
		return super(EventManager, self).get_queryset().filter(is_approved=True).annotate(first_date=Min('event_logistics__date', filter=Q(event_logistics__date__gte=timezone.now())))

	def approved_events(self, user):
		if user.is_authenticated:
			return super(EventManager, self).get_queryset().filter(Q(is_approved=True) | 
				Q(sanggu_hosts__user=user) | 
				Q(org_hosts__user=user) | 
				Q(office_hosts__user=user)).annotate(first_date=Min('event_logistics__date', 
					filter=Q(event_logistics__date__gte=timezone.now())))

		return super(EventManager, self).get_queryset().filter(Q(is_approved=True)).annotate(first_date=Min('event_logistics__date', 
			filter=Q(event_logistics__date__gte=timezone.now())))

class Event(SoftDeletionModel):
	objects = EventManager()
	MEMBERS = 'MEM'
	UNDERGRADS = 'UND'
	GRADUATES = 'GRAD'
	LS = 'LS'
	ADMU = 'ADMU'
	PUBLIC = 'PUB'
	EMPLOYEES = 'EMP'
	UNDERGRADS_GRADS = 'UND_GRAD'


	AUDIENCE_CHOICES = [
		(MEMBERS, 'Members Only'),
		(UNDERGRADS, 'LS Undergraduate Students only'),
		(GRADUATES, 'LS Graduate Students only'),
		(UNDERGRADS_GRADS, 'LS Students (Undergraduate and Graduate)'),
		(EMPLOYEES, 'LS Employees only'),
		(LS, 'LS Community (Students + Employees)'),
		(ADMU, 'ADMU Community (LS, GS, HS)'),
		(PUBLIC, 'Open to the Public'),
		
	]

	name = models.CharField(max_length=200)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_approved = models.BooleanField(default=False)
	audience = models.CharField(
		max_length=200,
		choices=AUDIENCE_CHOICES,
		default=UNDERGRADS
	)
	poster_url = models.URLField(blank=True)
	is_premium = models.BooleanField(default=False)
	event_url = models.URLField(blank=True)
	tags = models.ManyToManyField(Tag, related_name="event_list")
	sanggu_hosts = models.ManyToManyField(SangguHost, blank=True, related_name='event_list')
	office_hosts = models.ManyToManyField(OfficeHost, blank=True, related_name='event_list')
	org_hosts = models.ManyToManyField(OrgHost, blank=True, related_name='event_list')
	created_by = models.IntegerField(blank=True)

	def __str__(self):
		return self.name

	# def save(self, *args, **kwargs):
	# 	from main_events.views.event_auth_view import sync_calendar, change_logistics, change_details
	# 	old_approved = False
	# 	if self.pk:
	# 		old_name = Event.objects.get(pk=self.pk).name
	# 		old_description = Event.objects.get(pk=self.pk).description
	# 		old_approved = Event.objects.get(pk=self.pk).is_approved
	# 	super(Event, self).save(*args, **kwargs)
	# 	if self.pk and not old_approved and self.is_approved:
	# 		sync_calendar(self)
	# 	elif self.pk and self.event_calendars.exists():
	# 		if (old_name != self.name) or (old_description != self.description):
	# 			change_details(self)

	# @property
	# def has_happened(self):
	# 	return self.event_logistics.last().date < timezone.now().date()
	
	# @property
	# def closest_date(self):
	# 	if self.has_happened:
	# 		return self.event_logistics.first().date
	# 	else:
	# 		return self.event_logistics.filter(date__gte=timezone.now()).annotate(closest_date=Min('date')).first().date

class EventCalendar(models.Model):
	event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_calendars')
	event_cal_id = models.CharField(max_length=200)
	sanggu_host = models.ForeignKey(SangguHost, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='event_calendar_links')
	org_host = models.ForeignKey(OrgHost, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='event_calendar_links')
	office_host = models.ForeignKey(OfficeHost, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='event_calendar_links')
	event_logistic = models.ForeignKey('EventLogistic', on_delete=models.CASCADE, related_name='event_calendar_links')

	def __str__(self):
		return self.event.name + " - " + self.event_cal_id

def hosts_added(sender, instance, **kwargs):
	from main_events.views.event_auth_view import add_hosts, remove_hosts
	action = kwargs.pop('action', None)
	pk_set = kwargs.pop('pk_set', None)    
# 	if action == "post_add" and instance.event_calendars.exists():
# 		add_hosts(instance, pk_set)
# 	elif action == "post_remove" and instance.event_calendars.exists():
# 		remove_hosts(instance, pk_set)

# m2m_changed.connect(hosts_added, sender=Event.org_hosts.through)
# m2m_changed.connect(hosts_added, sender=Event.sanggu_hosts.through)
# m2m_changed.connect(hosts_added, sender=Event.office_hosts.through)


class EventLogisticManager(models.Manager):
	def get_queryset(self):
		return super(EventLogisticManager, self).get_queryset().annotate(is_done=Count(Case(When(date__gte=timezone.now(), then=1)))).order_by('-is_done', 'date', 'start_time')

class EventLogistic(models.Model):
	objects = EventLogisticManager()

	event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_logistics')
	date = models.DateField()
	start_time = models.TimeField()
	end_time = models.TimeField()
	venue = models.ForeignKey(Venue, null=True, blank=True, on_delete=models.SET_NULL)
	outside_venue_name = models.CharField(max_length=200, blank=True)

	# def save(self, *args, **kwargs):
	# 	from main_events.views.event_auth_view import change_logistics, new_logistic
	# 	if self.pk:
	# 		super(EventLogistic, self).save(*args, **kwargs)
	# 		if self.event.is_approved and self.event_calendar_links:
	# 			change_logistics(self)
	# 	else:
	# 		super(EventLogistic, self).save(*args, **kwargs)
	# 		if self.event.is_approved:
	# 			new_logistic(self)

	# def delete(self, *args, **kwargs):
	# 	from main_events.views.event_auth_view import delete_logistics
	# 	if self.event_calendar_links:
	# 		delete_logistics(self)
	# 	super(EventLogistic, self).delete(*args, **kwargs)
