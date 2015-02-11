/**
 * Module dependencies
 */

var frisby = require('frisby');
var c = require('chalk');


/**
 * Test getting all notes
 */

frisby.create('Get all notes')
  .get('http://localhost:3000/api/notes')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();