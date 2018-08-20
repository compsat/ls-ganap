#!/bin/bash

# Apply database migrations
echo "Create the database migrations"
python3 ls_ganap/manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python3 ls_ganap/manage.py migrate

# Run fixtures
echo "Run Fixtures"
python3 ls_ganap/manage.py loaddata clusters.yaml
python3 ls_ganap/manage.py loaddata tags.yaml
python3 ls_ganap/manage.py loaddata org_type.yaml
python3 ls_ganap/manage.py loaddata event_hosts.yaml
python3 ls_ganap/manage.py loaddata organizations.yaml
python3 ls_ganap/manage.py loaddata test.yaml

# Create superuser
echo "Create superuser"
python ls_ganap/manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='ls_ganap123@gmail.com'):
    User.objects.create_superuser('ls_ganap123@gmail.com', 'ilovecompsat')
if not User.objects.filter(email='test@obf.ateneo.edu'):  
    User.objects.create_user('test@obf.ateneo.edu', 'test123')
END

# Start server
echo "Starting server"
python3 ls_ganap/manage.py runserver 0.0.0.0:8000


