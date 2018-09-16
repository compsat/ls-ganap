# LS Ganap Backend
LS Ganap Backend source code.
## Getting Started
LS Ganap Backend works with Python Django 

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
cd ls-ganap/api
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

### Preproduction Instructions
```
git push heroku `git subtree split --prefix api preproduction`:master --force
heroku run sh docker-entrypoint.sh
```