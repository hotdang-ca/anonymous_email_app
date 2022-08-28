`use strict`

const autoload = require('auto-load');
const fortune = require('fortune');
const fortuneHTTP = require('fortune-http');
const express = require('express');

const store = fortune(autoload('./src/models'), require('./src/adapters/mongodb')({url: process.env.MONGODB_URL}));

store.connect().then(() => {
    //set up fortuneJS http server for mongoDB
    const httpListener = fortuneHTTP(store);
    const app = express();
    app.use(httpListener);
    app.listen(process.env.FORTUNE_PORT, () => {
        console.log(`FortuneJS server started on port ${process.env.FORTUNE_PORT}`);
    });
});
