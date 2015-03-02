##Course Notes
A new offline-first way to write, read, and review your notes on your laptop and phone.

####How to install and run the web app

1. Get [node.js](http://nodejs.org/)
2. Get [RethinkDB](http://rethinkdb.com/)
3. Open a shell and run `rethinkdb` anywhere
4. Run the project stuff:

```bash
$ git clone https://github.com/bentranter/course-notes.git
$ cd course-notes && cd web
$ npm install
$ npm start
```

The RethinkDB admin console will be on `0.0.0.0:8080` and the Express app will be on `0.0.0.0:3000`.

####Problems?

I haven't updated to RethinkDB 1.16 or to Thinky 1.16. In Thinky 1.16, `then` is a shortcut for `run().then` so that might cause problems if you're running the latest version.

###API Endpoints

######Not Secure

- `/api/signup` Post (requires `x-www-form-urlencoded`)
- `/api/login` Post (requires `x-www-form-urlencoded`)
- `/api/people` Get
- `/api/people/:id` Get
- `/api/people/:id` Put (requires `x-www-form-urlencoded`)
- `/api/people/:id` Delete
- `/api/people` Post (requires `x-www-form-urlencoded`)

######Secure

A request to a secure endpoint requires a valid **JSON web token**, You can get one when you sign up, or login. It will be sent in the response. You must send your token with every request to any secure endpoint. Its recommended that you set it as an `X-Access-Token` in the request header. See below for alternative to ways to send your token.

- `/api/notes` Get
- `/api/notes/:id` Get
- `/api/notes/:id` Put (requires `x-www-form-urlencoded`)
- `/api/notes/:id` Delete
- `/api/notes` Post (requires `x-www-form-urlencoded`)

####Making a request

A sample POST request would look something like, 

```http
POST /api/signup HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded

username=YourUserName&password=YourPassword
```

Your username and password are just sent as a string in the request body.

When you make a request to any other endpoint, you must send your token. There are three **ways** that you can send your token:

1. As an `x-access-token` in the header.
2. As an `accessToken` in the body.
3. As an `accessToken` in the URL params, example: `/api/notes?accessToken=yoursupercrazylongtoken`

Supported Data Models:

######User

- `username`: String
- `password`: String

######Notes

- `title`: String
- `subtitle`: String
- `content`: String
- `folder`: String
- `dateCreated`: Date
- `dateUpdated`: Date
- `timesReviewed`: Number

######People (our test endpoint)

- `firstName`: String
- `lastName`: String
- `coolnessFactor`: Number

###Tests

To run the tests, `cd` into `/web/test`, and run `$ jasmine-node .`. If every test fails, make sure you have RethinkDB and the server running, and then try again.

###Roadmap

######Server
- **get notes from signed in user**
- look into push notification event queue

######Client
- implement functionality
- implement Stripe API
- handle contentEditable stuff

######Android
- 