# Run the application:
## $ docker-compose up

## Wait for the deps installation and migrations to be finished

### default app runs on localhost:3000
### To change the APP port, change the PORT var on .env file, and also change the port on docker-compose.yaml

# Running e2e tests:
## get in the app container:
## $ docker exec -it app-node bash
## $ npm run test

## public url of this application: << to be deployed. >>