from django.db import models
from django.db.models import fields
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models.query import QuerySet
from django.utils import timezone
from main_events.soft_deletion_model import SoftDeletionModel
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from datetime import datetime, timedelta, date
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
	('6', 'Sunday'),
	('0', 'Monday'),
	('1', 'Tuesday'),
	('2', 'Wednesday'),
	('3', 'Thursday'),
	('4', 'Friday'),
	('5', 'Saturday')
)

class Event(SoftDeletionModel):
	name = models.CharField(max_length=200)
	venue = models.ForeignKey(Venue, null=True, on_delete=models.SET_NULL)
	host = models.ForeignKey(EventHost, related_name="hosted_events", on_delete=models.CASCADE)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()
	recurrence_bool = models.BooleanField(help_text='Is the event recurring?',default=False)
	# datetimes = ArrayField(models.DateTimeField(), default=list)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_accepted = models.BooleanField(default=False)
	poster_url = models.URLField()
	outside_venue_name = models.CharField(max_length=200, blank=True)
	is_premium = models.BooleanField(default=False)
	event_url = models.URLField()
	tags = models.ManyToManyField(Tag, related_name="event_list")

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)
		if self.recurrence_bool:
			call_create_recurrence(self.id, self)
		elif not self.recurrence_bool and self.recurrence:
			self.recurrence = None
			delete_recurrence(self.id)

	def __str__(self):
		return self.name

class Recurrence(models.Model):
	event = models.OneToOneField(Event, on_delete=models.CASCADE, primary_key=True, related_name='recurrence')
	# Is this event single-day or recurring?
	freq = models.CharField(max_length=50, choices=FREQUENCY, default='None', help_text='How frequent is the recurrence?')
	# every how many days/weeks/months
	repeats = models.IntegerField(default=1, help_text='Every how many days/weeks/months?')
	recur_days = MultiSelectField(choices=WEEKDAYS, blank=True, null=True, help_text='If recurrence is weekly, on what days will the event occur on?')
	# Radio button for one of these two
	end_recur_date = models.DateField(blank=True, null=True, help_text='Choose a date for when the recurrence will end')
	end_recur_times = models.IntegerField(blank=True, null=True, help_text='Until how many occurrences for this event to end?')
	
	datetimes = ArrayField(models.DateField(), default=list)

	def recurrence_dates(self):
		datetimes = self.datetimes
		start_time = self.event.start_time
		current_startdate = date(start_time.year, start_time.month, start_time.day)
		weekday_index = 0
		recur_days_list = self.sorted_recur_days(self.get_recur_days_list(), current_startdate)
		end_recur_times = self.end_recur_times

		if self.freq == 'Weekly' and current_startdate.weekday() not in recur_days_list:
			next_day = self.get_frequency(current_startdate, weekday_index, recur_days_list)
			while not next_day:
				next_day = self.get_frequency(current_startdate, weekday_index, recur_days_list)
				weekday_index = weekday_index+1
				if weekday_index == len(recur_days_list):
					current_startdate = current_startdate + timedelta(days=(7*self.repeats+recur_days_list[0]-current_startdate.weekday()))
					weekday_index = 0
					break
		else:
			datetimes.append(current_startdate)
			if self.freq == 'Weekly':
				weekday_index = recur_days_list.index(current_startdate.weekday())+1
			if end_recur_times:
				end_recur_times = end_recur_times - 1
		
		if self.end_recur_date:
			while current_startdate <= self.end_recur_date:
				next_day = self.get_frequency(current_startdate, weekday_index, recur_days_list)
				current_startdate = current_startdate + next_day
				datetimes.append(current_startdate)
				if weekday_index == len(recur_days_list):
					weekday_index = 0
				weekday_index = weekday_index + 1
		elif self.end_recur_times:
			for counter in range(0, end_recur_times):
				next_day = self.get_frequency(current_startdate, weekday_index, recur_days_list)
				current_startdate = current_startdate + next_day
				datetimes.append(current_startdate)
				if weekday_index == len(recur_days_list):
					weekday_index = 0
				weekday_index = weekday_index + 1

	def get_weekday(self, sourcedate, index, recur_days_list):
		current_day = sourcedate.weekday()
		day_chosen = recur_days_list[index]
		if day_chosen - current_day >= 0:
			day_difference = day_chosen - current_day
			return timedelta(days=day_difference)

	def get_frequency(self, sourcedate, index, recur_days_list):
		reps = self.repeats
		if self.freq == "Daily":
			return timedelta(days=reps)
		elif self.freq == "Weekly":
			if len(recur_days_list) > 0 and index < len(recur_days_list):
				return self.get_weekday(sourcedate, index, recur_days_list)
			elif index == len(recur_days_list):
				temp = index-1
				return timedelta(days=(7*reps+recur_days_list[0]-recur_days_list[temp]))
		elif self.freq == "Monthly":
			day = 0
			for counter in range(0, reps):
				month = sourcedate.month
				year = sourcedate.year + month // 12
				month = month % 12 + 1
				day += min(sourcedate.day,calendar.monthrange(year,month)[1])
				sourcedate = sourcedate + timedelta(days=day)
			return timedelta(days=day)

	def get_day_repr(self, day_chosen):
		if day_chosen == 'Sunday':
			return 6
		elif day_chosen == 'Monday':
			return 0
		elif day_chosen == 'Tuesday':
			return 1
		elif day_chosen == 'Wednesday':
			return 2
		elif day_chosen == 'Thursday':
			return 3
		elif day_chosen == 'Friday':
			return 4
		elif day_chosen == 'Saturday':
			return 5

	def sorted_recur_days(self, recur_days_list, starting):
		int_list = []
		for day in recur_days_list:
			int_list.append(self.get_day_repr(day))
		int_list.sort()
		# if starting.weekday() in int_list:
		# 	index = int_list.index(starting.weekday())
		# 	int_list = int_list[index:] + int_list[:index]
		# else:
		# 	pass
		return int_list

	def save(self, *args, **kwargs):
		del self.datetimes[:]
		self.recurrence_dates()
		super(Recurrence, self).save(*args, **kwargs)


def create_recurrence(id, Event):
	r = Recurrence.objects.create(pk=id, event=Event, freq='Daily', repeats=1, recur_days='6', end_recur_times=1)
	return r

def delete_recurrence(id):
	r = Recurrence.objects.get(pk=id)
	r.delete()

def call_create_recurrence(id, Event):
	try:
		if not Event.recurrence:
			create_recurrence(id, Event)
	except Recurrence.DoesNotExist:
		create_recurrence(id, Event)
				