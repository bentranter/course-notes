// Module deps
var request = require('supertest');
var jwt     = require('jwt-simple');

// URL to test against
var url = '127.0.0.1:3000/api';
// var signUpURL = 'http://localhost:3000/api/signup',
//     loginURL  = 'http://localhost:3000/api/login',
//     userURL   = 'http://localhost:3000/api/user',
//     peopleURL = 'http://localhost:3000/api/people',
//     notesURL  = 'http://localhost:3000/api/notes',
//     username  = 'test@test.org',
//     password  = 'password';

describe('GET /api', function() {
  it('should return the documentation for the API as JSON', function(done) {
    request(url)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
});

describe('GET /api/login', function() {
  it('should send the user a valid JWT after successful login', function(done) {
    request(url)
      .get('/login')
      .expect(200)
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
  it('should tell the user that their password was wrong', function(done) {
    request(url)
      .get('/login')
      .expect(401)
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
  it('should tell the user that their email doesn\' exist', function(done) {
    request(url)
      .get('/login')
      .expect(401)
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
});