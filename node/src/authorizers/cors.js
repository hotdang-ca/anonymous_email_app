module.exports = {
  optionsSuccessStatus: 200,
  origin: function(origin, callback) {
    if(process.env.NODE_ENV == 'development') {
      callback(null, true);
    }
    else {
      if(!origin || process.env.CORS_ORIGINS.split(',').indexOf(origin) !== -1) {
        callback(null, true);
      }
      else {
        callback(new Error(`${origin} is not permitted`));
      }
    }
  }
};
