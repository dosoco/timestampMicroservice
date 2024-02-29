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

// Date parsing and formatting route
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  if (!date) {
    // If date is not provided, use the current date
    parsedDate = new Date();
  } else {
    // Check if date is a number (Unix timestamp), parse it accordingly
    const unixTimestamp = parseInt(date);
    if (!isNaN(unixTimestamp)) {
      // Date is a Unix timestamp
      parsedDate = new Date(unixTimestamp);
    } else {
      // Date is in a natural date format
      parsedDate = new Date(date);
    }
  }

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
