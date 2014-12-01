'use strict';

var loggerProvider = require('core-service-common').providers.bunyanLogger;
module.exports = loggerProvider(require('../../config').get('log'));
