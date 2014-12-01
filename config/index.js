'use strict';

var join = require('path').join;
var nconf = require('nconf');
var env = process.env.NODE_ENV;

if (!env) {
  throw new Error('Please specify NODE_ENV environment variable');
}

nconf.use('memory');
nconf.env();

nconf.defaults({
  port: process.env.PORT || 3000,

  log: {
    streams: [{
      level: 'info',
      path: join('logs', env + '.log')
    }]
  },

  session: {
    secret: 'c0d211ed-a090-4340-b2b5-1b5aa284b479',
    saveUninitialized: true,
    resave: true
  },

  cookies: {
    secret: '7a04de51-7522-4bed-9c0e-f82bdd9f6867'
  },

  zk: {
    host: process.env.ZK_HOST || '127.0.0.1',
    port: process.env.ZK_PORT || 2181,
    root: process.env.ZK_ROOT || '/penton/core/services'
  }
});

module.exports = nconf;
