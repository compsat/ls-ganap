#!/bin/bash

# Apply database migrations
echo "Create the database migrations"
python3 ls_ganap/manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python3 ls_ganap/manage.py migrate

echo "Run Fixtures"
python3 ls_ganap/manage.py loaddata clusters.yaml
python3 ls_ganap/manage.py loaddata test.yaml

# Start server
echo "Starting server"
python3 ls_ganap/manage.py runserver 0.0.0.0:8000


