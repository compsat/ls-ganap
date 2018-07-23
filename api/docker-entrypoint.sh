#!/bin/bash

# Apply database migrations
echo "Create the database migrations"
python3 ls_ganap/manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python3 ls_ganap/manage.py migrate

echo "Run Fixtures"
python3 ls_ganap/manage.py loaddata clusters.yaml
python3 ls_ganap/manage.py loaddata tags.yaml
python3 ls_ganap/manage.py loaddata test.yaml

# Create superuser
echo "Create superuser"
python ls_ganap/manage.py shell << END
from django.contrib.auth.models import User
if not User.objects.filter(username='ls_ganap'):
    User.objects.create_superuser('ls_ganap', 'ls_ganap123@gmail.com', 'ilovecompsat')
END

# Start server
echo "Starting server"
python3 ls_ganap/manage.py runserver 0.0.0.0:8000


