<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Check the results with GraphQL

- Please start the app on the `dev` environment before accessing the playground, because the playground is disabled on the `prod`

```bash
npm run start:dev
```

- Visit the url to check with playground: [Playground](http://localhost:3000/graphql)
- Query example:

```graphql
query {
  getWebProvise {
    id
    name
    parentId
    cost
    createdAt
    children {
      id
      name
      parentId
      cost
      createdAt
      children {
        id
        name
        parentId
        cost
        createdAt
        children {
          id
          name
          parentId
          cost
          createdAt
        }
      }
    }
  }
}
```

- Response example:

```graphql
{
  "data": {
    "getWebProvise": [
      {
        "id": "uuid-1",
        "name": "Webprovise Corp",
        "parentId": "0",
        "cost": "52983",
        "createdAt": "2021-02-26T00:55:36.632Z",
        "children": [
          {
            "id": "uuid-2",
            "name": "Stamm LLC",
            "parentId": "uuid-1",
            "cost": "5199",
            "createdAt": "2021-02-25T10:35:32.978Z",
            "children": [
              {
                "id": "uuid-4",
                "name": "Price and Sons",
                "parentId": "uuid-2",
                "cost": "1340",
                "createdAt": "2021-02-25T06:11:47.519Z",
                "children": []
              },
              {
                "id": "uuid-7",
                "name": "Zieme - Mills",
                "parentId": "uuid-2",
                "cost": "1636",
                "createdAt": "2021-02-25T07:56:32.335Z",
                "children": []
              },
              {
                "id": "uuid-19",
                "name": "Schneider - Adams",
                "parentId": "uuid-2",
                "cost": "794",
                "createdAt": "2021-02-25T21:06:18.777Z",
                "children": []
              }
            ]
          },
          {
            "id": "uuid-3",
            "name": "Blanda, Langosh and Barton",
            "parentId": "uuid-1",
            "cost": "15713",
            "createdAt": "2021-02-25T15:16:30.887Z",
            "children": [
              {
                "id": "uuid-5",
                "name": "Hane - Windler",
                "parentId": "uuid-3",
                "cost": "1288",
                "createdAt": "2021-02-25T13:35:57.923Z",
                "children": []
              },
              {
                "id": "uuid-6",
                "name": "Vandervort - Bechtelar",
                "parentId": "uuid-3",
                "cost": "2512",
                "createdAt": "2021-02-26T01:41:06.479Z",
                "children": []
              },
              {
                "id": "uuid-9",
                "name": "Kuhic - Swift",
                "parentId": "uuid-3",
                "cost": "3086",
                "createdAt": "2021-02-25T16:02:49.099Z",
                "children": []
              },
              {
                "id": "uuid-17",
                "name": "Rohan, Mayer and Haley",
                "parentId": "uuid-3",
                "cost": "4072",
                "createdAt": "2021-02-25T11:17:52.132Z",
                "children": []
              },
              {
                "id": "uuid-20",
                "name": "Kunde, Armstrong and Hermann",
                "parentId": "uuid-3",
                "cost": "908",
                "createdAt": "2021-02-26T01:51:25.421Z",
                "children": []
              }
            ]
          },
          {
            "id": "uuid-8",
            "name": "Bartell - Mosciski",
            "parentId": "uuid-1",
            "cost": "28817",
            "createdAt": "2021-02-25T23:47:57.596Z",
            "children": [
              {
                "id": "uuid-10",
                "name": "Lockman Inc",
                "parentId": "uuid-8",
                "cost": "4288",
                "createdAt": "2021-02-26T01:39:33.438Z",
                "children": []
              },
              {
                "id": "uuid-11",
                "name": "Parker - Shanahan",
                "parentId": "uuid-8",
                "cost": "12236",
                "createdAt": "2021-02-26T00:32:01.307Z",
                "children": [
                  {
                    "id": "uuid-12",
                    "name": "Swaniawski Inc",
                    "parentId": "uuid-11",
                    "cost": "2110",
                    "createdAt": "2021-02-25T06:44:56.245Z"
                  },
                  {
                    "id": "uuid-14",
                    "name": "Weimann, Runolfsson and Hand",
                    "parentId": "uuid-11",
                    "cost": "7254",
                    "createdAt": "2021-02-25T15:22:08.098Z"
                  }
                ]
              },
              {
                "id": "uuid-13",
                "name": "Balistreri - Bruen",
                "parentId": "uuid-8",
                "cost": "1686",
                "createdAt": "2021-02-25T20:45:53.518Z",
                "children": []
              },
              {
                "id": "uuid-15",
                "name": "Predovic and Sons",
                "parentId": "uuid-8",
                "cost": "4725",
                "createdAt": "2021-02-25T18:00:26.864Z",
                "children": []
              },
              {
                "id": "uuid-16",
                "name": "Weissnat - Murazik",
                "parentId": "uuid-8",
                "cost": "3277",
                "createdAt": "2021-02-26T01:50:50.354Z",
                "children": []
              }
            ]
          },
          {
            "id": "uuid-18",
            "name": "Walter, Schmidt and Osinski",
            "parentId": "uuid-1",
            "cost": "2033",
            "createdAt": "2021-02-26T02:31:22.154Z",
            "children": []
          }
        ]
      }
    ]
  }
}
```

## License

Nest is [MIT licensed](LICENSE).
