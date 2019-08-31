# LS Ganap
LS Ganap source code.
## Getting Started
LS Ganap Front-end works with React
LS Ganap Back-end works with Python Django 
This is built on Docker.

```
git clone https://github.com/compsat/ls-ganap.git
```
### Prerequisites
* Docker
    * [Docker for Mac](https://www.docker.com/docker-mac)
    * [Docker for Windows](https://www.docker.com/docker-windows)

### Setup
To build the images (This step will take a while)

```
cd ls-ganap/
docker-compose build
```
To run the django server use the ff command:

```
docker-compose up
```


To test if the API is working, in your browser, go to:


[http://127.0.0.1:8000/events](http://0.0.0.0:8000/events)

To access documentation, go to: 

[http://127.0.0.1:8000/docs](http://0.0.0.0:8000/docs)

If you want to shut down the services, open another terminal and in the same project directory, 

```
docker-compose down
```

**NOTE: DO NOT USE CTRL + C**

### Docker-related Back-end Concerns
When you want to install a new Python dependency or package, add an entry to `requirements.txt`:
```
[package_name]==[version_number]
```
Then, run every time you add an entry to the `requirements.txt` file:
```
docker-compose build
```

If you want to run a `manage.py` command, you have to use Docker for it:
```
docker-compose run api python manage.py [migrate/makemigrations/shell/createsuperuser]
```

When you want to access the PostgreSQL database shell, you have to find the container ID of the database in Docker using
`docker ps` and run:
```
docker exec -it [database_ID] bash
psql -U postgres // this is after accessing the database shell
```

If you want to reset the Postgres database that Docker made, look for the database using `docker ls` (it's probably
called api_pgdata), and run:
```
docker volume rm [database_name]
```
