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

###Proposed Data Models

######USERS
- First Name
- Last Name
- Email
- Email isVerified
- Password
- Date they signed up
- Something for two factor auth (phone number???)
- School
- Program
- Major
- Year Level
- Country
- State/Province/Whatever
- City
- Language
- Date they last signed in
- Date they last wrote a note
- Date they last reviewed a note
- AppleID/Google Play Stuff
- Amount of times they signed in

######NOTES
- Title
- Date created
- Date updated
- User it belongs to:
    - All their info for tracking stats 
- Content (this is gonna be hard to store)
- Note number (auto-increment)
- Folder name
- Path to the document
- Time last reviewed
- Times reviewed