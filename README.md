# Lagersystem

A simple warehouse management system that can be used for tracking orders, order status and warehouse status


## Description

This is a RESTful API utilizing a MySQL server to simulate keeping track of orders and warehouse statuses. It's useful for a variety of scenarios, including online shops, warehouse management systems, postal services, etc.

## Getting Started

### Dependencies

* Windows 11
* Visual Studio Code 2022
* Python 3.11

### Installing
#### Backend
* Download the code as a .zip-folder.
* Navigate to the folder, where you downloaded it.
* Open a Python terminal.
* In the terminal, create a virtual environment:
  ```
  python -m venv .venv
  ```
* Once that has been done, activate the virtual environment:
```
.\.venv\Scripts\Activate.ps1
```
* When the virtual environment has been activated, run this command:
```
pip install -r requirements.txt
```
* This will install all the necessary libraries for running the program

#### Frontend
* Install node.js.
* Go to `frontend` dir.
* Run commands
```
npm install
npm run dev
```
### Executing program

## Docker container
* This project is designed to be used with a Docker Container. To run the container, download Docker Desktop: https://www.docker.com/products/docker-desktop/
* When you have Docker Desktop up and running, download this project as a .zip-folder
* When you have downloaded this project:
* * Navigate to the project folder:
    ```
    cd path/to/folder/Lagersystem_Docker_uge8
    ```
* * To create the Dockerfile:
  ```
  docker init
  ```
  * When prompted for language, choose Python 3.13
  * Make sure to set port to 8000.
  * When prompted for the command to run the application, set it to:
  ```
  python src/app.py
  ```
* * Run the following command:
  ```
  docker compose up --build
  ```
  If everything works, you should see the following output:
  ```
  Running on http://###.#.#.#:8000
  ```
  

### Tests
The project uses the package `pytest` to perform unit- and integration-tests.
* Open terminal (powershell/bash)
* Go to Project Root Directory
* Run the command (all tests)
```
pytest
```
* Run the command (unit tests)
```
pytest tests/unit
```
* Run the command (integration tests)
```
pytest tests/integration
```

## Design
This system is designed as a Model-View-View-Model (MVVM) system.
That means that all data handling is done by the backend and the frontend only handles user inputs and showing the data.
### Overall system design
<img width="121" height="291" alt="Frontend API drawio" src="https://github.com/user-attachments/assets/811a4c37-b599-41cd-b9d2-5a04dce749ee" />


## Help

We don't have any help files for this project yet.

## Authors

Contributors names and contact info

Dennis Armtoft Jensen 
[@allandark](https://github.com/allandark)
Luke Sinclair
[@thelumss](https://github.com/Thelumss)
Viktor Hugo Hersom From
[@jameswebbtelescope](https://github.com/JamesWebbTelescope)

## Version History

* 1.0
* * Development version including authentication and product endpoints

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* https://www.geeksforgeeks.org/python/how-to-run-a-flask-application/
* https://github.com/JamesWebbTelescope/uge-3
