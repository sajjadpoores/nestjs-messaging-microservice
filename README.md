# Restful Messaging App
A microservice architecture Nest.js app handling all required APIs for a messaging application

## Documentation
### Entity Relation Diagram
![ERD document](documentations/messaging-erd.png)

### Component Based Architecture
![ERD document](documentations/component-based-architecture.png)


## Microservices

This repository consists of three NestJS microservices: gateway, message, and user. These services communicate with each other through RabbitMQ and use PostgreSQL as their database.

All the microservices in this repository use EditorConfig to standardize text editor configuration. Visit [editorconfig.org](https://editorconfig.org) for details.

## Running the Project

#### Using Docker
The easiest way to run the entire project is through Docker Compose. Docker will set up the PostgreSQL database, RabbitMQ, and the microservices.

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

2. Build and run with Docker Compose: Run the following command to build the Docker images and start the services:
```bash
docker-compose up --build
```
This will start:

- PostgreSQL on port 5432
- RabbitMQ on ports 5672 (AMQP) and 15672 (Management UI)
- gateway service on port 3000
- message service on port 3001
- user service on port 3002

3. Access RabbitMQ Management UI:
- Open a browser and navigate to http://localhost:15672.
- The default username and password are both guest.

#### Running Locally with npm
1. Install dependencies: Navigate to each microservice folder (gateway, message, user) and install the required dependencies:

```bash
cd gateway
npm install
cd ../message
npm install
cd ../user
npm install
```

2. Run the microservices: Each microservice has a separate command to start in production mode. Run these commands in separate terminals:
- For gateway:
```bash
cd gateway
npm run start:prod
```
- For message:
```bash
cd message
npm run start:prod
```

- For user:
```bash
cd user
npm run start:prod
```

### Database preparation
To run the microservices correctly make sure to have two databases named `user` and `message`, so that their microservices can connect to it and run the migrations.

### Accessing swagger documentation
You can access swagger API documentation via `http://localhost:3000/api`
