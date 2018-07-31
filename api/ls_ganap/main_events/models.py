from django.db import models
from django.db.models import fields
from django.db.models.query import QuerySet
from django.utils import timezone
from main_events.soft_deletion_model import SoftDeletionModel
#from recurrence.fields import RecurrenceField
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from datetime import datetime, timedelta
import calendar

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
		
class Tag(models.Model):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

class RecurrenceField(fields.Field):
	def value_to_string(self, obj):
		return self.get_prep_value(self.value_from_object(obj))

FREQUENCY = (
	('None', 'None'),
	('Daily', 'Daily'),
	('Weekly', 'Weekly'),
	('Monthly', 'Monthly'),
)

WEEKDAYS = (
	('SUN', 'Sunday'),
	('MON', 'Monday'),
	('TUE', 'Tuesday'),
	('WED', 'Wednesday'),
	('THU', 'Thursday'),
	('FRI', 'Friday'),
	('SAT', 'Saturday'),
)

class Event(SoftDeletionModel):
	name = models.CharField(max_length=200)
	venue = models.ForeignKey(Venue, null=True, on_delete=models.SET_NULL)
	host = models.ForeignKey(EventHost, related_name="hosted_events", on_delete=models.CASCADE)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()
	datetimes = ArrayField(models.DateTimeField(), default=list)
	freq = models.CharField(max_length=50, choices=FREQUENCY, default='None')
	# every __ days/weeks/months
	repeats = models.IntegerField(default=1)
	recur_days = MultiSelectField(choices=WEEKDAYS, default='SUN')
	end_recur_date = models.DateTimeField(blank=True, default=timezone.now)
	end_recur_times = models.IntegerField(blank=True, default=1)
	#recurrence = RecurrenceField()
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

	def recurrence_dates(self):
		if self.end_recur_date:
			start_time = self.start_time
			current_startdate = datetime(start_time.year, start_time.month, start_time.day, start_time.hour, start_time.minute, start_time.second)
			current_enddate = self.end_time

			while current_startdate <= self.end_recur_date:
				self.datetimes.append(current_startdate)
				current_startdate = current_startdate + self.get_frequency(current_startdate)

			return self.datetimes

	def get_frequency(self, sourcedate):
		reps = self.repeats
		if self.freq == "Daily":
			return timedelta(days=(reps))
		elif self.freq == "Weekly":
			return timedelta(days=7*reps)
		elif self.freq == "Monthly":
			day = 0
			for counter in range(1, reps):
				month = sourcedate.month
				year = sourcedate.year + month // 12
				month = month % 12 + 1
				day += min(sourcedate.day,calendar.monthrange(year,month)[1])
			return timedelta(days=day)
