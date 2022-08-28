`use strict`

const autoload = require('auto-load');
const fortune = require('fortune');
const fortuneHTTP = require('fortune-http');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./src/authorizers/cors');

const store = fortune(autoload('./src/models'), require('./src/adapters/mongodb')({url: process.env.MONGODB_URL}));

store.connect().then(() => {
    const app = express();
    const jsonListener = fortuneHTTP(store, require('./src/serializers/jsonapi'));
    app.use(cors(corsOptions));
    app.use(jsonListener);
    app.listen(process.env.JSON_PORT, () => {
        console.log(`JSONAPI server started on port ${process.env.JSON_PORT}`);
    });
});
