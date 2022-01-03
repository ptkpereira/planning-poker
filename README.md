# Planning Poker API

<!-- ABOUT THE PROJECT -->

## About The Project

A Planning Poker REST API that is an agile estimating and planning technique that is consensus based.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Trying out the API

### With Docker

You'll need [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for that. Once you've got it installed on your machine, just clone the repo and run the `docker-compose up` command. The API will be listening for your requests at `http://localhost:3000`.

### Without Docker

```bash
# install
$ npm install
```

Rename env.example to .env and set the yout PostgreSQL and JWT enviroment variables

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
```

```bash
# Run the below code and the API will be listening for your requests at `http://localhost:3000`
$ npm run start:dev
```

### Documentation

See all endpoints at `http://localhost:3000/api`

## Unit Test

Run `npm run test:docker` if using Docker or `npm run test`

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
