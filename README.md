# NPD

NPD: Nodejs(Express+Sequelize+Babel+Jest)+Postgres+Docker

## Installation

If you want to test this repo by Docker, you can use this:

https://github.com/mehranhamedani/npd-docker

Otherwise, you can do the following steps:

# Step 1: git clone

```bash
$ git clone https://github.com/mehranhamedani/npd-api
```

# Step 2: npm install

```bash
$ npm install
```

# Step 3: create database

Doanload database script:

https://github.com/mehranhamedani/npd-docker/blob/master/db/init.sql

Execute on your Postgres server

# Step 4: env config

Edit development.json in config/development.json by your database info

# Step 4: test

```bash
$ npm test
```

# Stemp 5: run

linux: 

```bash
$ npm run start:linux:dev
```

windows: 

```cmd
npm run start:win:dev
```

# Stemp 6: Test by curl and Postman

curl:

```bash
$ curl http://[host-name-in-config]:[port-name-in-config]/api/food/getFoods
```

Postman:

You can import Postman json file for test by postman:

  * postman/food.postman_collection.json

  * postman/localhost.postman_environment.json

  * postman/server.postman_environment.json

