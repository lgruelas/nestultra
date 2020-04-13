[![Build Status](https://travis-ci.com/lgruelas/nestultra.svg?branch=master)](https://travis-ci.com/lgruelas/nestultra)

# Ultra task

## Prerequisites
 - The only one is have [docker](https://www.docker.com/get-started) installed and being logged in to be able to pull the images.

## Build the containers
To build the containers you just need to clone the repo and open a terminal inside the directory, then just build the containers with:
```bash
docker-compose up
```

## Usage

### First
Please make a `POST` request to the endopint:
```
http://localhost:3700/trigger/populate
```
In order to populate the database with example data needed in postman.

### Port and url
The port exposed port of the Nest application is `3700`, so to test the API calls should be done to that port, you can see the default index view your browser at: `http://localhost:3700`.

All the requests related to this task should be done at `http://localhost:3700/cars`.

## Unittests
If you already have the containers running, the tests are run just with:
```bash
docker exec -it nest_worker npm test
```

## Remove
To remove the containers, the volume and the network just run:
```bash
docker-compose down -v
```

## Endpoints
### GET
| resource      | description                       |
|:--------------|:----------------------------------|
| `/cars`             | returns a list of all the cars and his relations.
| `/cars/{car_id}`    | returns a car description with his relations.
| `/cars/{car_id}/manufacturer` | returns a manufacturer description for the given car. |
| `/trigger`      | Trigger a process which will automatically remove the owners who bought their cars before the last 18 months and apply a discount of 20% to all cars having a date of first registration between 12 and 18 months. |
### POST
| resource      | description                       |
|:--------------|:----------------------------------|
| `/cars`             | Inserts a car in the database, if the owners and manufacturer id alredady exists it associates with them, if not, they are created **firstRegistrationDate** is optional.
| `/trigger/populate`    | Special endpoint that adds an example to the database, should be reached just once.
### PUT
| resource      | description                       |
|:--------------|:----------------------------------|
| `/cars/{car_id}`             | Updates a car value in the db, it doesn't change the values in owners or manufacturer but if another id that exists is sended it changes the relationships.
### DELETE
| resource      | description                       |
|:--------------|:----------------------------------|
| `/cars/{car_id}`  | Deletes a car value in the db.

## Postman collection
You can test the API with the postman collection that have some requests preload with the example values added with the trigger endpoint.

To use it just import the file `ultra_task.postman_collection.json` with the postman option.