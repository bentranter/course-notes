'use strict';

/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  errorHandler = require('express-error-handler'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  api = require('./api'),
  auth = require('./util/auth'),
  http = require('http'),
  path = require('path'),
  c = require('chalk'),
  liveServer = require('live-server');
var app = module.exports = express();



/**
 * Configuration
 */

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(compress());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
  next();
});

// Enable development
var env = process.env.NODE_ENV || 'development';

// Development only
if (env === 'development') {
  app.use(errorHandler());
}

// Production only
if (env === 'production') {
  // @TODO
}



/**
 * Routes - API
 */

// Nonsecure endpoints. You can sign up or login
// at these.
app.get('/api', api.showEndpoints);

app.post('/api/login', api.login);
app.post('/api/signup', api.signUp);

// Secure endpoints
app.delete('/api/user', auth.authorizeToken, api.deleteUser);

// Notes -- this is the real stuff. The server won't actually
// accept a username from you, it'll grab it instead from your
// token.
app.get('/api/notes', auth.authorizeToken, api.listNotes);
app.get('/api/notes/:id', auth.authorizeToken, api.getNote);
app.delete('/api/notes/:id', auth.authorizeToken, api.deleteNote);
app.put('/api/notes/:id', auth.authorizeToken, api.updateNote);
app.post('/api/notes', auth.authorizeToken, api.addNote);



/**
 * Start Server
 */

http.createServer(app)
  .listen(app.get('port'), function () {
    console.log('\nAPI listening on ' + c.green(app.get('port')));
  });

/**
 * Start live-server at 5681 and launch your browser
 */
 liveServer.start(5680, 'www', false);
liveServer.start(5681, 'public', true);