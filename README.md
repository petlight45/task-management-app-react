# Task Management Project

This project is a React.js web app written in TypeScript, following Hexagonal Architecture and using Awilix for Dependency Injection. It employs Tailwind for styling.

## Features

- **Hexagonal Architecture**: Organized code into distinct layers for better maintainability and scalability.
- **Awilix**: Dependency Injection container for managing application dependencies.
- **React Query and Axios**: API Calls and query management.
- **Redux Toolkit**: Effective State management.


## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   https://github.com/petlight45/task-management-app-react.git
   cd task-management-app-react 
   
## Configuration
   
1. **Set up environmental variables**

   ```bash
   cp .env.example .env
 Update the .env file with your local configuration values.
 
 VITE_HTTP_SERVER_BASE_URL=The base endpoint url of the HTTP server this frontend app makes API requests to
 
 
 VITE_WS_SERVER_BASE_URL=The base endpoint url of the WS server this frontend app establishes a WS connection with
 
 
 ## Running the Server
 
 To run the server:
 
 Install docker and docker compose on your operating environment
 
 Run this
 
    ```bash
    docker-compose up --build
    
Or this, in case the above did not work

      ```bash
      docker compose up --build

## Testing
 
 To run the unit tests and integration tests:
 
 Run this
 
    ```bash
    npm install
    npm test
    
