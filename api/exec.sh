#!/bin/bash

# Make database migrations
echo "Create the Database Migrations"
python3 manage.py makemigrations

# Apply database migrations
echo "Apply database"
python3 manage.py migrate

echo "Run Fixtures"
python3 manage.py loaddata clusters.yaml
python3 manage.py loaddata tags.yaml
python3 manage.py loaddata org_type.yaml
python3 manage.py loaddata event_hosts.yaml
python3 manage.py loaddata organizations_NEW.yaml
python3 manage.py loaddata offices_NEW.yaml
python3 manage.py loaddata sanggu_NEW.yaml
python3 manage.py loaddata venues.yaml

# Create superuser
echo "Create superuser"
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='ls_ganap123@gmail.com'):
    User.objects.create_superuser('ls_ganap123@gmail.com', 'ilovecompsat')
if not User.objects.filter(email='test@obf.ateneo.edu'):
    User.objects.create_user('test@obf.ateneo.edu', 'test123')
END

# Start server
echo "Starting server"
python3 manage.py runserver 0.0.0.0:8000 --settings=ls_ganap.dev_settings
