MPI Assignment Metacognitive Learning Assignment
==============================
This repository is for part 1 of the 
Metacognitive Learning Assignment by Ruiqi He.
It contains a Django Web Application, levering the jsPsych javaScript library for running behavioral experiments in a web browser.

A live demo can be found here: [http://157.230.77.26/](http://157.230.77.26/)
For the best user experience, I recommend using a Desktop PC / Laptop using Chrome or Firefox.
However, a mobile view on a Smartphone (landscape mode) or Tablet is supported.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
For local deployment you nee:
 * Python version > 3.7
 * Docker version > 2.3
 * Docker-Compose
 * Pip version > 19.2

### Installing Python only
Install the required python packages from requirement.txt 
```
pip install -r requirements.txt
```

Run the migrations
```
python manage.py makemigrations && python manage.py migrate
```
Create a super user
```
python manage.py createsuperuser
```
Start the application
```
python manage.py runserver
```
Create an account using Signup and then start the game (Get Started)

### Installing using Docker
Install Docker and Docker-Compose.

Build and start the application
```
docker-compose up --build
```
Create an account using Signup and then start the game (Get Started)

## Usage
Once all prerequisites are installed and the docker image is up and running, one can conduct an experiment.
* Login in or Sign up using the button in the nav bar
* Start an experiment by clicking the "Get Started Choice Game" button
* Choose the number of rounds you would like to play
* For each round, follow the instructions displayed
* At the end of the trial, the experiment data will be displayed. The data will be send to the sqlite3 database for permanent storage

The Django Admin panel can be used to create new users if desired.
## Built With
* [Django](https://docs.djangoproject.com/en/3.1/) - High-level Python Web framework
* [jsPsych](https://github.com/jspsych/jsPsych/) - JavaScript library for running behavioral experiments in a web browser
* [Materialize](https://github.com/Dogfalo/materialize) - A modern responsive front-end framework based on Material Design
* [Bootstrap](https://github.com/twbs) - Front-end framework  toolkit


## Authors
* **Ruiqi He** - [Reeche](https://github.com/Reeche)

## License
This project is licensed under the MIT License