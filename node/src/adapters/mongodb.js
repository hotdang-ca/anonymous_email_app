`use strict`

const autoload = require('auto-load');
const mongodbAdapter = require('fortune-mongodb');
const npm_package = require('../../package.json');
module.exports = function(options){
  return {
    adapter: [
        mongodbAdapter,
        {
            url: options.url,
            useUnifiedTopology: true
        }
    ],
    hooks: autoload('./src/hooks'),
    documentation: autoload('./src/documents'),
    settings: {
        name: npm_package.name,
        description: npm_package.description
    }
  };
};
