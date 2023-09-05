# Run DynamoDB locally:
## $ docker-compose up -d

# Run the application:
## $ docker run --rm -it --env-file=.env -p 3000:3000 -v $(pwd):/work -w /work node:18.16.0 bash

# Migrate:
## $ make migrate

# Run the app:
## $ npm run start

# Run e2e tests:
## $ npm run test