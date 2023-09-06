# Pokemon API using Nest.js and DynamoDB

# Run the application:
## $ docker-compose up

## Wait for the deps installation and migrations to be finished

### default app runs on localhost:3000
### To change the APP port, change the PORT var on .env file, and also change the port on docker-compose.yaml

# Endpoints
## GET /sync
### Fetches pokemons from the pokemon API and stores in the DynamoDB

## GET /sync/{pokemon_id}
### Fetches a pokemon by id from the pokemon API, and updates it in the DynamoDB.

## GET /pokemon
### Fetches all pokemon from DynamoDB

## GET /pokemon/{pokemon_id or pokemon_name}
### Fetches a pokemon by name or id from DynamoDB.

## GET /pokemon/type/{pokemon_type}
### Fetches all pokemon by a given type from DynamoDB.

# Running e2e tests:
## get in the app container:
## $ docker exec -it app-node bash
## $ npm run test

## public url of this application: << to be deployed. >>