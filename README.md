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