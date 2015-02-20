/**
 * Module dependencies
 */

var frisby = require('frisby'),
	c = require('chalk');


/**
 * Test getting all people.
 */

frisby.create('Get all notes')
  .get('http://localhost:3000/api/people')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();