#!/bin/bash

# Apply database migrations
echo "Create the database migrations"
heroku run python3 manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
heroku run python3 manage.py migrate

# Run fixtures
echo "Run Fixtures"
heroku run python3 manage.py loaddata clusters.yaml
heroku run python3 manage.py loaddata tags.yaml
heroku run python3 manage.py loaddata org_type.yaml
heroku run python3 manage.py loaddata event_hosts.yaml
heroku run python3 manage.py loaddata org_users.yaml
heroku run python3 manage.py loaddata organizations.yaml
heroku run python3 manage.py loaddata sanggu_users.yaml
heroku run python3 manage.py loaddata sanggu.yaml
heroku run python3 manage.py loaddata test.yaml
heroku run python3 manage.py loaddata venues.yaml
heroku run python3 manage.py loaddata mock_events.yaml

# Create superuser
echo "Create superuser"
heroku run python3 manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='ls_ganap123@gmail.com'):
    User.objects.create_superuser('ls_ganap123@gmail.com', 'ilovecompsat')
if not User.objects.filter(email='test@obf.ateneo.edu'):  
    User.objects.create_user('test@obf.ateneo.edu', 'test123')
END


