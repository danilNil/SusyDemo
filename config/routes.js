'use strict';

/**
 * @this express.Router
 * @param controllers
 */
module.exports = function (controllers) {

  this.get('/', controllers.home.index);

};
