var express    = require('express');
var cors       = require('cors');
var app        = express();
var bodyParser  = require('body-parser');

// Set Port
var port = process.env.PORT || 3000;

// Apply Cors middleware
app.use(cors());

app.use(bodyParser.json());

// Require all routes in /routes
require('./routes')(app);

// Create server
app.listen(port, function(){
  console.log('Listening on port ', port);
});
