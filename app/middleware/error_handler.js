'use strict';

var errorHandler = require('errorhandler');

module.exports = function (opts) {

  if (process.env.NODE_ENV === 'production') {
    return function (err, req, res, next) { //jshint ignore:line
      res.status(err.status || 500);

      var type = req.accepts(['html', 'json', 'text']);
      var response = { message: err.message };

      switch (type) {
        case 'html':
          res.render('error', response);
          return;
        case 'json':
          res.json(response);
          return;
        default:
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(err.message);
      }
    };
  }

  errorHandler.title = 'Industry Week';
  return errorHandler(opts);
};
