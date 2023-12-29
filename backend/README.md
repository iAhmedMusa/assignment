## Description

4udoctors is one of the best telemedicine online system.

## Installation

```bash
$ cp .env.local .env
$ npm install
```

## Migration

```bash
# NOTE: before run migration, every time REMOVE DATABASE and RECREATE DATABASE
# run migration
$ npm run migration:run
```

## Running the app

```bash

# Build the application
$ npm run build

# production mode
$ npm run start:prod

# watch mode
$ npm run start:dev

# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
