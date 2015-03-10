'use strict';

// @TODO: Remove json:true from all tests


/**
 * Module dependencies
 */

var frisby = require('frisby'),
    jwt = require('jwt-simple');

/**
 * Assign each endpoint a variable name
 */

var signUpURL = 'http://localhost:3000/api/signup',
    loginURL  = 'http://localhost:3000/api/login',
    userURL   = 'http://localhost:3000/api/user',
    peopleURL = 'http://localhost:3000/api/people',
    notesURL  = 'http://localhost:3000/api/notes',
    username  = 'test@test.org',
    password  = 'password';



/**
 * Test signing up. Since Frisby is actually a pile,
 * and makes it impossible to do synchronous tests,
 * this shit has to happen.
 */

frisby.create('Signup as a new user')
    .post(signUpURL, {
        username: username,
        password: password
    },
    {
        json: true
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        token: String,
        expires: Number,
        user: String
    })
    .afterJSON(function() {

        /**
         * Test logging in
         */

        frisby.create('Login as newly created user')
        .post(loginURL, {
            username: username,
            password: password
        },
        {
            json: true
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSONTypes({
            token: String,
            expires: Number,
            user: String
        })
        .afterJSON(function(api) {

            // Now the real testing begins. We need to
            // save the token returned by the server,
            // and use it for each test. We also use
            // the username provided by the token, to
            // emulate the real use case.
            var token = api.token;



        /**
         * Create a new note
         */

        frisby.create('Create a new note')
            .post(notesURL + '?accessToken=' + token, {
                title: 'testnote',
                subtitle: 'testsubtitle',
                content: 'testcontent',
                folder: 'test'
            }, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes({
                title: String,
                subtitle: String,
                content: String,
                username: String,
                folder: String,
                dateCreated: String,
                dateUpdated: String,
                timesReviewed: Number,
                id: String
            })
        .toss();

        /**
         * Get the note.
         */

        

        /**
         * Delete the user.
         */

        frisby.create('Delete user')
            .delete(userURL + '?accessToken=' + token, {
                username: username,
            }, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            // .expectJSONTypes({
            //     title: String,
            //     subtitle: String,
            //     content: String,
            //     author: String,
            //     folder: String,
            //     dateCreated: String,
            //     dateUpdated: String,
            //     timesReviewed: Number,
            //     id: String
            // })
        .toss();

        })
    .toss();
    })
.toss();