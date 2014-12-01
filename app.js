'use strict';

var path = require('path');
var express = require('express');

var session = require('express-session');
var flash = require('express-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var errorHandler = require('./app/middleware/error_handler');
var locals = require('./app/middleware/locals');

var app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// TODO (maxmalov): should be delegated to nginx later
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));

app.use(locals());
app.use(cookieParser(config.get('cookies:secret')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.get('session')));
app.use(flash());

var router = require('./app/components/router');
app.use('/', router);
app.use(errorHandler());

module.exports = app;
