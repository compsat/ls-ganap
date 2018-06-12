# LS Ganap Backend
LS Ganap Backend source code.
## Getting Started
LS Ganap Backend works with Python Django 
```
git clone https://github.com/eddrichjanzzenang/ls-ganap.git
```
### Prerequisites
* Docker
    * [Docker for Mac](https://www.docker.com/docker-mac)
    * [Docker for Windows](https://www.docker.com/docker-windows)

### Setup
To build the images (This step will take a while)
```
docker-compose build
```
To set up initial postgres database migration
```
docker-compose run web python ls_ganap/manage.py migrate
```
To run the django server use the ff command:
```
docker-compose up
```
After, in your browser, go to: (http://0.0.0.0:8000/)
If you want to shut down the services, open another terminal and in the project directory, 
```
docker-compose down
```
