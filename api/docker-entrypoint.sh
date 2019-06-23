#!/bin/bash

# Apply database migrations
echo "Create the database migrations"
python3 manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python3 manage.py migrate

# Run fixtures
echo "Run Fixtures"
python3 manage.py loaddata clusters.yaml
python3 manage.py loaddata tags.yaml
python3 manage.py loaddata org_type.yaml
python3 manage.py loaddata event_hosts.yaml
python3 manage.py loaddata org_users.yaml
python3 manage.py loaddata office_users.yaml
python3 manage.py loaddata sanggu_users.yaml
python3 manage.py loaddata organizations.yaml
python3 manage.py loaddata offices.yaml
python3 manage.py loaddata sanggu.yaml
# python3 manage.py loaddata test.yaml
python3 manage.py loaddata venues.yaml
# python3 manage.py loaddata new_mock_events.yaml
# python3 manage.py loaddata mock_events.yaml
# python3 manage.py loaddata mock_event_logistics.yaml

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
python3 manage.py runserver 0.0.0.0:8000


