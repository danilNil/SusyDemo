'use strict';

var ServiceDiscovery = require('core-service-discovery').ServiceDiscovery;

var config = require('../../config/index');

var sdkPool = require('./sdk_pool');
var logger = require('./logger');

var serviceDiscovery = new ServiceDiscovery({
  logger: logger.child({ component: 'service discovery' }),

  zkHost: config.get('zk:host'),
  root: config.get('zk:root'),

  dependencies: sdkPool.names()
});

module.exports = {
  start: function () {
    return serviceDiscovery.init(sdkPool);
  },
  stop: function () {
    return serviceDiscovery.stop();
  }
};
