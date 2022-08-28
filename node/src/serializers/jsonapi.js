'use strict'

const jsonApiSerializer = require('fortune-json-api');

module.exports = {
    serializers: [
        [jsonApiSerializer, {
            prefix: process.env.NAMESPACE
        }]
    ]
}
