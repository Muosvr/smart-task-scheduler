const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = "./config/keys/token.json"

fs.readFile(path.resolve(__dirname, '../config/keys/credentials.json'), (err, content) => {
  if (err) {
    console.log('Error loading client secret file:', err)
    res.send('Error loading client secret file: \n' + err);
  };
  // Authorize a client with credentials, then call the Google Calendar API.

  const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[1]
  )

  //Setting auth as global default
  google.options({
    auth: oauth2Client
  })
  const scopes = ['https://www.googleapis.com/auth/calendar'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })



  console.log(url);

  router.get("/login", (req, res) => {
    // console.log('redirecting');
    // res.redirect(url);
    res.send({ url });

  })

  router.get("/", async (req, res) => {
    const authorizationCode = req.query.code;
    console.log("auhrization code", authorizationCode);

    const { tokens } = await oauth2Client.getToken(authorizationCode)
    oauth2Client.setCredentials(tokens);

    fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
      if (err) return console.error(err);
      console.log('Token stored to', TOKEN_PATH);
      res.redirect("oauth/getevents");
    });

  })

  router.get("/getevents", (req, res) => {

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        console.log("token not found");
        res.redirect("/oauth/login");
        return
      } else {
        console.log("token found");
      }
      oauth2Client.setCredentials(JSON.parse(token));
      const calendar = google.calendar({ version: 'v3', oauth2Client });
      calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, result) => {
        if (err) {
          console.log('The API returned an error: ' + err)
          res.send('The API returned an error: ' + err);
        };
        const events = result.data.items;

        res.send(events);

        if (events.length) {
          console.log('Upcoming 10 events:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
      });
    });


  })

});


module.exports = router;



