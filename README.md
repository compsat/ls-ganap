# LS Ganap
LS Ganap source code.
## Getting Started
LS Ganap Front-end works with React

LS Ganap Back-end works with Python Django 

This was originally built on Docker. If you want to use Docker, go to the end of the README. If you don't want to use Docker, please follow the instructions below.

```
git clone https://github.com/compsat/ls-ganap.git
```

## Setting up without Docker
**To set up the back-end after cloning this repo, please install PostgreSQL on your computers and proceed to the virtualenv section of this README first before anything. For the PostgreSQL installation, look it up on the [website](http://www.postgresqltutorial.com/install-postgresql/)**

### Front-end
Make sure your Terminal's working directory is at the `client` folder by running `cd ls_ganap/client`.

The .env.client file sent to you MUST BE PRESENT in the client folder (i.e. the same folder as the package.json). **Make sure to rename your .env.client file to .env**. Without this .env, the website will return some errors when you try to run the server.

Run the following commands to run the client server:
```
npm install
```
This will install the dependencies found in the package.json.

```
npm start
```
This will start the React server, with `REACT_APP_API_URL` found in the .env as the API url.

### Back-end

Make sure your Terminal's working directory is at the `api` folder by running `cd ls_ganap/api`.

The .env.api file sent to you MUST BE PRESENT in the api folder (i.e. the same folder as the manage.py). **Make sure to rename your .env.api file to .env**. Without this .env, the website will return some errors when you try to run the server.

Whenever you run manage.py commands, remember also that your virtual environment must be activated. Read more about virtual environments below.

#### virtualenv
[Read more about python virtual environments here](https://www.geeksforgeeks.org/python-virtual-environment/)

A virtual environment is a tool that helps to keep dependencies required by different projects separate by creating isolated python virtual environments for them.

What are the commands you need to remember?
```
python -m venv ~/.virtualenvs/lsganap_venv
```
This creates a virtual environment named lsganap_venv in a folder entitled .virtualenvs. If you use Anaconda for your Python commands, please run `conda create -n lsganap_venv python=x.x anaconda` instead (where x.x is your Python version). 

```
source ~/.virtualenvs/lsganap_venv/bin/activate // (on Mac)
~\.virtualenvs\lsganap_venv\Scripts\activate // (on Windows)
```
This activates your virtualenv in your Terminal window, which means you can now use the dependencies installed in your venv.

```
pip install -r requirements.txt
```
Installs all the dependencies listed in the requirements.txt of this repo to your virtualenv. Make sure your Terminal is at the same directory as the requirements.txt. **This command should be done when setting up the Django project.**

```
pip install [package_name]
```
If you find an external Python library which you think you can use for this project, you can install it in your virtualenv using this command. Don't forget to add the library and the version you installed to the requirements.txt so that other collaborators can also install the dependency in their virtualenvs.

#### Postgres

Make sure that you've already installed Postgres on your computer. The Postgres details (username, password, database name, etc.) is found in the .env file, so your Postgres configuration MUST match the ones found in the .env. That means that the username, password and database name you create must be the same as the ones in the .env file. To configure your Postgres, follow the instructions in this [website](https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line). Here's a summary of the steps:

Creating a Postgres user
1. `createuser --interactive --pwprompt` - creates a user with prompt
2. At the Enter name of role to add: prompt, type the user's name.
3. At the Enter password for new role: prompt, type a password for the user.
4. At the Enter it again: prompt, retype the password.
5. At the Shall the new role be a superuser? prompt, type y to grant superuser access.

Creating a Postgres database
1. `createdb -O [USER_NAME] [DB_NAME]` - creates a database. Make sure to replace the `[USER_NAME]` and `[DB_NAME]` with your username and database name, respectively.
2. Run `psql -U [USER_NAME]` to run your Postgres shell as the superuser.
3. `GRANT ALL ON DATABASE [DB_NAME] TO [USER_NAME];` - makes sure that your user has permissions to do any action to the database.

#### Running the server

A script has been made to automatically run necessary Django commands to run the server. To execute the script, please follow the instructions:
1. Make sure that your virtualenv is still activated, the dependencies on requirements.txt have been installed, and that your directory is at the `api` folder.
2. To makemigrations, migrate, load the fixtures, create a superuser, and run the server in one command, run `bash exec.sh`.

However, if you just want to run the server, run `python manage.py runserver 0.0.0.0:8000 --settings=ls_ganap.dev_settings`.

#### Django Commands
After that, here are some Django commands that you might use in the future. Please read the Django tutorials in their official docs to fully understand these commands.

```
python manage.py runserver --settings=ls_ganap.dev_settings
```
 - runs the web server with the dev_settings file (only for development)
 - to change the port: python manage.py runserver [port_number]
 - to change server’s IP: python manage.py runserver [ip]:[port]

```
python manage.py makemigrations
```
 - adds the changes made into the database

```
python manage.py migrate
```
 - applies the changes to the database

```
python manage.py check
```
 - checks for any problems in your project without making migrations or touching the database

```
python manage.py shell
```
 - invokes the python shell
 
```
python manage.py createsuperuser
```
 - creates a user who can login to the admin site
 
In the shell:
```
from [app_name].models import [model_name]
```
 - import the model in the shell

```
[model_name].objects.all()
```
 - displays all the objects in the database

```
v = [model_name]([field_name] = [value], …)
```
 - create an object in the database

```
v.save()
```
 - saves the object into the database

```
v.id
```
 - gets the ID

```
[model_name].objects.get(pk=1)
```
 - gets the object with primary key 1

```
v.[field_name]_set.all()
```
 - displays any choices from the related object set

```
v.[field_name]_set.create(parameters…)
```
 - creates objects and adds to the related set

## Setting up on Docker

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
