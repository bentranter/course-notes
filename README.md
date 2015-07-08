# Course Notes

Get straight A's studying for three minutes a day.

### How to install and run the web app

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

### API Endpoints

The API expects the `Content-Type` header to be `x-www-form-urlencoded`, but I'll fix this soon.

###### Not Secure

- `/api/signup` Post 
- `/api/login` Post 
- `/api/people` Get
- `/api/people/:id` Get
- `/api/people/:id` Put
- `/api/people/:id` Delete
- `/api/people` Post 

###### Secure

A request to a secure endpoint requires a valid **JSON web token**, You can get one when you sign up, or login. It will be sent in the response. You must send your token with every request to any secure endpoint. It's recommended that you set it as an `X-Access-Token` in the request header. See below for alternative to ways to send your token.

- `/api/notes` Get
- `/api/notes/:id` Get
- `/api/notes/:id` Put 
- `/api/notes/:id` Delete
- `/api/notes` Post 

### Making a request

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

### Tests

Testig is done with **Mocha**. You'll need Mocha installed globally on your machine (`npm i -g mocha`, if you haven't already). Then start RethinkDB, the Express server, and run `npm test`. 

### Contributing

Pull requests, feature requests, uhh friend requests... no wait that's Facebook. If you have something to contribute, you're more than welcome to :)

### API

API will follow [JSON API](http://jsonapi.org/) on release.

### License

MIT.
