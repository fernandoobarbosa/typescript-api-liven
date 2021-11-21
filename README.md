# Typescript api liven

NodeJs REST API with typescript

---

## How to execute

### 0 - Prerequisites

Before executing the application, make sure that you have the following prerequesites:

- NodeJs
- Yarn
- Docker

### 1 - Configure environment variables

The following variables are **REQUIRED** to work.

```
SECRET=SECRET //jwt secret
MONGO_URI=MONGO_URI //mongo url
PORT=PORT //default port is 3000
```

### 2 - Start the application

There's two ways to start the application, with or without docker.

#### 2.1 - With Docker

In your project base directory,run the command:

```sh
  docker-compose up
```

#### 2.2 - Without Docker

In your project base directory, install all dependencies with the command:

```sh
 yarn
```

Then, simply execute the following command to start the application:

```sh
  yarn start
```

### 3 - Documentation

You can check and test the routes in the /docs route in your api, you can test online in this link : https://ts-api-test-1235.herokuapp.com/docs/

## Author:

- **Fernando Luiz de Carvalho Barbosa**
