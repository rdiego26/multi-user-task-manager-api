# Multi user task manager API
API to multi user task manager.

![Octopus](https://thumbs.dreamstime.com/b/angry-black-silhouettes-octopus-cartoon-mascot-character-angry-black-silhouettes-octopus-cartoon-mascot-character-120324876.jpg)

# Steps to run(for dev)
1. Resolve dependencies `npm install` .
2. UP container: `docker-compose up` . (or user `docker-compose up --force-recreate` to force clean cache)
3. Running app with live reload(nodemon) inside the container: `docker-compose run app npm run dev`


# Scripts
- To generate coverage report: `docker-compose run app npm run coverage`
- To only run tests: `docker-compose run app npm test`
- To create a migration: `npm run migrate create NAME_OF_YOUR_MIGRATION` - Locally the migrations runs when container up
