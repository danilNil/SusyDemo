'use strict';

var _ = require('lodash');
var util = require('util');

module.exports = function () {

  return function (req, res, next) {
    res.locals.util = util;
    res.locals._ = _;
    res.locals.env = process.env.NODE_ENV;

    next();
  };
};
