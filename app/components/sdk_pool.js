'use strict';

var core = require('core-service-discovery');

var SdkPool = core.SdkPool;
var requiredSdk = core.providers.requiredSdk(require('../../package.json'));

module.exports = new SdkPool(requiredSdk);
