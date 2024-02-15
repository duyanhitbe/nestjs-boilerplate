<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## What is boilerplate code?
Boilerplate code is computer language text that you can reuse with little or no alteration in several different contexts.

## Description
This is a boilerplate using <b>NestJS</b>, a popular NodeJS framework, reducing time to write CRUD method by generating code.

## Installation
```bash
$ git clone https://github.com/duyanhitbe/nestjs-boilerplate.git

$ cd nestjs-boilerplate
```
Now, you can choose kind of ORM you want to use.
- Typeorm for SQL (typeorm)
- Mongoose for MongoDB (mongoose)

And, you can choose what type of API (Application Programming Interface):
- RESTful (rest)
- GraphQL (graphql)

Example:
```bash
$ git checkout rest/typeorm

$ pnpm install

# Install pnpm if you haven't
$ npm i -g pnpm
```

## Environment
```bash
$ cp .env.example .env
```
Then replace your owner config

## Running
```bash
# dev mode
$ pnpm start:dev

# prod mode
$ pnpm build
$ pnpm start:prod

# pm2
$ pm2 start ecosystem.config.js
```

## Testing
```bash
# Unit test
$ pnpm test

# End-to-End test
$ pnpm test:e2e
```

## Generating
Strong of this boilerplate code that you can generate CRUD module quickly with one command.
```bash
$ make crud name=example

? What transport layer do you use? (Use arrow keys)
❯ REST API #<-- Choose this one if you are using Restful
  GraphQL (code first) #<-- Choose this one if you are using GraphQL
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets

? Would you like to generate CRUD entry points? (Y/n) #<--Yes or Y
```

## Stay in touch
- Author - Duy Anh (doba)
- Email - [duyanh.it.work@gmail.com](mailto:duyanh.it.work@gmail.com)
- Linked - [profile](https://linkedin.com/in/duy-anh-nguyen-a62292249)