# node-express-mongo-sample

- Node.js
- [Express 4](http://expressjs.com/)
- handlebars
- scss
- MongoDB

## Dev setup

### install mongo

`$ brew install mongodb`

run locally
```
mongod --config /usr/local/etc/mongod.conf
```

add .env file to project root with mongodb uri

```
MONGODB_URI=mongodb://localhost
```

- `$ npm install`


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ npm run start-dev
```

Your app should now be running via nodemon (detects local updates) on [localhost:5000](http://localhost:5000/).


## resources

https://devcenter.heroku.com/articles/node-best-practices
https://github.com/lelylan/simple-oauth2

### background jobs
https://github.com/Automattic/kue
https://github.com/OptimalBits/bull
