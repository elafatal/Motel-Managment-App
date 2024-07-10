
# Motel management App

## Motel management Front-End

here is a single page application using ReactJs.
This project is an API base application written in micro-service architecture that uses multiple external libraries and packages like axios for API calls.
This project uses a pre-made back-end written with FastAPI and SQLAlchemy.
To use it and test it follow instructions below:
<br><br>

### 1. Download project

Download the project into your devise or simply clone the project into your virtual environment or any directory
you want by running the
command :

```commandline
git clone https://github.com/elafatal/Motel-Managment-System
```

### 2. Install requirements

First you should install the requirements of the project, for that, go to the project directory and run the command :

```commandline
pip install -r backend/requirements.txt 
```
```commandline
cd Front
npm install
```

wait for packages and libraries to be installed

### 3. Run the project

To run the project, first go to the root directory of project and run the following command:

```commandline
uvicorn backend.main:app --reload --port 8000
```

Then go to the front folder of the project and run the following command:

```commandline
npm run dev 
```
you can go to the url that has been shown in the command line.


You can create your own admin and use the panel. If you don't want to create an admin, database already has one default admin with default values of :

- Username : admin
- Password : admin