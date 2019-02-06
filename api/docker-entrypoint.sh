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
python3 manage.py loaddata mock_events.yaml
python3 manage.py loaddata mock_event_logistics.yaml

# Start server
echo "Starting server"
python3 manage.py runserver 0.0.0.0:8000


