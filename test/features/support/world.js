'use strict';

var Browser = require('zombie');

module.exports = function () {
  this.World = function World(done) {
    this.browser = new Browser();
    done();
  };
};
