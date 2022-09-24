// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/*Check if empty date in unix is introduced*/
app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(), 
    utc: new Date().toUTCString()})
})

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  console.log("This is the date from the link: "+date)
  let unix, utc;
  
  /*Check for valid date*/
  if(new Date(parseInt(date)).toString() === "Invalid Date") {
    res.json({ error : "Invalid Date" });
  }

  /* If date is in miliseconds */
  if(new Date(parseInt(date)).getTime() === parseInt(date)
    && date.indexOf("-") === -1 
    && date.indexOf(" ") === -1) {
    /*new Date() expects a number as an argument, that's why we use parseInt()*/
    unix = parseInt(date);
    utc = new Date(parseInt(date)).toUTCString();
    // console.log(unix);
    // console.log(utc);
  } else { /* If date is NOT in miliseconds*/
    unix = new Date(date).getTime();
    utc = new Date(parseInt(unix)).toUTCString()
  }
  res.json({unix: unix, utc: utc});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
