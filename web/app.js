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
  routes = require('./routes'),
  api = require('./routes/api'),
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
app.set('view engine', 'jade');
app.use(compress());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

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
 * Routes - Partials
 */

// Serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);



/**
 * Routes - API
 */

// Nonsecure endpoints. You can sign up or login
// at these.
app.post('/api/login', api.login);
app.post('/api/signup', api.signUp);

// Secure endpoints
app.get('/api/user', api.authorizeToken, api.getUserList);
app.delete('/api/user', api.authorizeToken, api.deleteUser);

// Notes -- this is the real stuff. The server won't actually
// accept a username from you, it'll grab it instead from your
// token.
app.get('/api/notes', api.authorizeToken, api.listNotes);
app.get('/api/notes/:id', api.authorizeToken, api.getNote);
app.delete('/api/notes/:id', api.authorizeToken, api.deleteNote);
app.put('/api/notes/:id', api.authorizeToken, api.updateNote);
app.post('/api/notes', api.authorizeToken, api.addNote);

// Redirect all others to the index (HTML5 history)
app.get('*', routes.index);



/**
 * Start Server
 */

http.createServer(app)
  .listen(app.get('port'), function () {
    console.log('\nExpress server listening on port ' + c.green(app.get('port')));
  });

/**
 * Start live-server at 3001 and launch your browser
 */
liveServer.start(3001, 'backbone-test', false);
liveServer.start(3002, 'www', false);

