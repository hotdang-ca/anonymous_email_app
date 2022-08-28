`use strict`

const autoload = require('auto-load');
const fortune = require('fortune');
const fortuneHTTP = require('fortune-http');
const oauth2HTTP = require('./src/listeners/oauth2');
const credentialAuthorizer = require('./src/authorizers/credential');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./src/authorizers/cors');

const store = fortune(autoload('./src/models'), require('./src/adapters/mongodb')({url: process.env.MONGODB_URL}));
store.connect().then(() => {
  //set up expressJS server for Oauth2 authentication
  const authListener = oauth2HTTP(store, {
      authorizer: credentialAuthorizer
  });
  const app = express();
  app.use(cors(corsOptions));
  app.use(express.json());
  app.route(`${process.env.NAMESPACE}/token`)
  .post(express.urlencoded(), authListener);
  app.listen(process.env.OAUTH2_PORT, () => {
      console.log(`OAUTH2 server started on port ${process.env.OAUTH2_PORT}`);
  });
});
