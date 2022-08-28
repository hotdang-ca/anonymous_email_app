'use strict'

const Encoder = require('../encoders/stringencoder');

module.exports = function(store, options = {authorizer: () =>{}}) {
    return (request, response, next) => {
        options.authorizer(store, request, response).then((result) => {
            response.json(result);
        }).catch((error) => {
            response.status(500).json({
              error: error.name,
              type: 'error',
              message: error.message
            });
            next();
        });
    };
}
