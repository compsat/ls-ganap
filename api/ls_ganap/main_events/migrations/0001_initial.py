# Generated by Django 2.0.5 on 2018-07-21 08:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cluster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('logo_url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_accepted', models.BooleanField(default=False)),
                ('poster_url', models.URLField()),
                ('outside_venue_name', models.CharField(blank=True, max_length=200)),
                ('is_premium', models.BooleanField(default=False)),
                ('event_url', models.URLField()),
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
                ('abbreviation', models.CharField(blank=True, max_length=10)),
                ('description', models.TextField()),
                ('accredited', models.BooleanField(default=False)),
                ('color', models.CharField(max_length=20)),
                ('logo_url', models.URLField()),
                ('cluster', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='org_list', to='main_events.Cluster')),
            ],
        ),
        migrations.CreateModel(
            name='EventHostSubscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_host_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_events.EventHost')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FollowedEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_events.Event')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HostType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TagSubscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_events.Tag')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TagToEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_events.Event')),
                ('tag_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_events.Tag')),
            ],
        ),
        migrations.CreateModel(
            name='Venue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='eventhost',
            name='host_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='host_list', to='main_events.HostType'),
        ),
        migrations.AddField(
            model_name='event',
            name='host_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='host_events', to='main_events.EventHost'),
        ),
        migrations.AddField(
            model_name='event',
            name='tags',
            field=models.ManyToManyField(related_name='event_list', to='main_events.Tag'),
        ),
        migrations.AddField(
            model_name='event',
            name='venue_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main_events.Venue'),
        ),
    ]
