from django.db import models
from django.db.models.query import QuerySet
from django.utils import timezone
from main_events.soft_deletion_model import *
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from cloudinary.models import CloudinaryField
from django.db.models import Min, Q

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
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='sanggu_host')
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
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='office_host')
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
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='org_host')
	name = models.CharField(max_length=200)
	abbreviation = models.CharField(max_length=30, blank=True)
	description = models.TextField()
	color = models.CharField(max_length=20)
	logo_url = models.ImageField(upload_to='images/', blank=True)
	event_host = models.ForeignKey(EventHost, blank=True, related_name='org_list', on_delete=models.DO_NOTHING)
	org_type = models.ForeignKey(OrgType, blank=True, related_name='org_list', on_delete=models.DO_NOTHING)
	cluster = models.ForeignKey(Cluster, blank=True, related_name='org_list', on_delete=models.DO_NOTHING)

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

class Event(SoftDeletionModel):
	objects = EventManager()

	name = models.CharField(max_length=200)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_approved = models.BooleanField(default=False)
	poster_url = models.ImageField(upload_to='images/', blank=True)
	is_premium = models.BooleanField(default=False)
	event_url = models.URLField()
	tags = models.ManyToManyField(Tag, related_name="event_list")
	sanggu_hosts = models.ManyToManyField(SangguHost, blank=True, related_name='event_list')
	office_hosts = models.ManyToManyField(OfficeHost, blank=True, related_name='event_list')
	org_hosts = models.ManyToManyField(OrgHost, blank=True, related_name='event_list')

	def __str__(self):
		return self.name

	# @property
	# def has_happened(self):
	# 	return self.event_logistics.last().date < timezone.now().date()
	
	# @property
	# def closest_date(self):
	# 	if self.has_happened:
	# 		return self.event_logistics.first().date
	# 	else:
	# 		return self.event_logistics.filter(date__gte=timezone.now()).annotate(closest_date=Min('date')).first().date

class EventLogistic(models.Model):
	event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_logistics')
	date = models.DateField()
	start_time = models.TimeField()
	end_time = models.TimeField()
	venue = models.ForeignKey(Venue, null=True, blank=True, on_delete=models.SET_NULL)
	outside_venue_name = models.CharField(max_length=200, blank=True)

	class Meta:
		ordering = ('date', 'start_time',)
