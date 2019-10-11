# Generated by Django 2.2.5 on 2019-09-29 16:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import main_events.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', main_events.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Cluster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('abbreviation', models.CharField(blank=True, max_length=30)),
                ('logo_url', models.ImageField(blank=True, upload_to='images/')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_approved', models.BooleanField(default=False)),
                ('audience', models.CharField(choices=[('MEM', 'Members Only'), ('UND', 'LS Undergraduate Students'), ('GRAD', 'LS Graduate Students'), ('LS', 'LS Community (Undergraduate + Graduate)'), ('ADMU', 'ADMU Community (LS, GS, HS)'), ('PUB', 'Open to the Public')], default='UND', max_length=200)),
                ('poster_url', models.URLField(blank=True)),
                ('is_premium', models.BooleanField(default=False)),
                ('event_url', models.URLField(blank=True)),
                ('created_by', models.IntegerField(blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EventHost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='OrgType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('abbreviation', models.CharField(max_length=3)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Venue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='SangguHost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('abbreviation', models.CharField(blank=True, max_length=30)),
                ('description', models.TextField()),
                ('color', models.CharField(max_length=20)),
                ('logo_url', models.ImageField(blank=True, upload_to='images/')),
                ('event_host', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='sanggu_list', to='main_events.EventHost')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sanggu_host', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='OrgHost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('abbreviation', models.CharField(blank=True, max_length=30)),
                ('description', models.TextField()),
                ('color', models.CharField(max_length=20)),
                ('logo_url', models.ImageField(blank=True, upload_to='images/')),
                ('cluster', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='org_list', to='main_events.Cluster')),
                ('event_host', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='org_list', to='main_events.EventHost')),
                ('org_type', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='org_list', to='main_events.OrgType')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org_host', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='OfficeHost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('abbreviation', models.CharField(blank=True, max_length=30)),
                ('description', models.TextField()),
                ('color', models.CharField(max_length=20)),
                ('logo_url', models.ImageField(blank=True, upload_to='images/')),
                ('event_host', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='office_list', to='main_events.EventHost')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='office_host', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='EventLogistic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('outside_venue_name', models.CharField(blank=True, max_length=200)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_logistics', to='main_events.Event')),
                ('venue', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main_events.Venue')),
            ],
        ),
        migrations.CreateModel(
            name='EventCalendar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_cal_id', models.CharField(max_length=200)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_calendars', to='main_events.Event')),
                ('event_logistic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_calendar_links', to='main_events.EventLogistic')),
                ('office_host', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='event_calendar_links', to='main_events.OfficeHost')),
                ('org_host', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='event_calendar_links', to='main_events.OrgHost')),
                ('sanggu_host', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='event_calendar_links', to='main_events.SangguHost')),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='office_hosts',
            field=models.ManyToManyField(blank=True, related_name='event_list', to='main_events.OfficeHost'),
        ),
        migrations.AddField(
            model_name='event',
            name='org_hosts',
            field=models.ManyToManyField(blank=True, related_name='event_list', to='main_events.OrgHost'),
        ),
        migrations.AddField(
            model_name='event',
            name='sanggu_hosts',
            field=models.ManyToManyField(blank=True, related_name='event_list', to='main_events.SangguHost'),
        ),
        migrations.AddField(
            model_name='event',
            name='tags',
            field=models.ManyToManyField(related_name='event_list', to='main_events.Tag'),
        ),
    ]
