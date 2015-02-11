'use strict';


/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
// var passport = require('passport');
var jwt = require('jwt-simple');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var chalk = require('chalk');
// var r = require('rethinkdb');
var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
});
var r = thinky.r;
var app = express();


/**
 * A helper for fixing paths.
 *
 * @param {String} the path string
 * @return {String} the resolved path
 *
 * @api private
 *
 */

var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


/**
 * Configure express.
 */

app.use(compress());
app.use(serveStatic(fixPath('public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.initialize());
// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Only expose tests in development mode
if (config.isDev) {
    app.use(serveStatic(fixPath('test/assets')));
    app.use(serveStatic(fixPath('test/spacemonkey')));
}
// Setup frames to test with SpaceMOnkey
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
// Use Jade
app.set('view engine', 'jade');


/**
 * API.
 */

var api = require('./api');

// Login so you get a token. Please switch to `GET` and get
// username and password from headers
app.post('/api/login', api.login);

// Users
app.post('/api/user', api.addUser);
app.get('/api/user', api.getUserList);

// People
app.get('/api/people', api.authorizeToken, api.list);
app.get('/api/people/:id', api.get);
app.delete('/api/people/:id', api.delete);
app.put('/api/people/:id', api.update);
app.post('/api/people', api.add);

// Notes
app.get('/api/notes', api.listNotes);
app.get('/api/notes/:id', api.getNote);
app.delete('/api/notes/:id', api.deleteNote);
app.put('/api/notes/:id', api.updateNote);
app.post('/api/notes/:id', api.addNote);

/**
 * Enable the functional test site in development.
 */

if (config.isDev) {
    app.get('/test*', semiStatic({
        folderPath: fixPath('test'),
        root: '/test'
    }));
}


/**
 * Set our client config cookie.
 */

app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


/**
 * Configure Moonboots to serve our client application.
 */

new Moonboots({
    moonboots: {
        jsFileName: 'course-notes',
        cssFileName: 'course-notes',
        main: fixPath('client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('public/css/bootstrap.css'),
            fixPath('public/css/app.css')
        ],
        browserify: {
            debug: false
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested, which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('templates'), fixPath('client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main css file is 
            // requested. Which means you can seamlessly change stylus files and see
            // new styles on refresh.
            if (config.isDev) {
                stylizer({
                    infile: fixPath('public/css/app.styl'),
                    outfile: fixPath('public/css/app.css'),
                    development: true
                }, done);
            } else {
                done();
            }
        }
    },
    server: app
});


/**
 * Listen for incoming http requests on the port as specified in our config.
 */

app.listen(config.http.port);

/**
 * Send startup message to user in the console.
 */
 
console.log(chalk.green(config.client.name) + ' is running at: http://localhost:' + config.http.port);

