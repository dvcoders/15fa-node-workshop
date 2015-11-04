var express    = require('express');
var cors       = require('cors');
var app        = express();

// Set Port
var port = process.env.PORT || 3000;

// Apply Cors middleware
app.use(cors());

// Require all routes in /routes
require('./routes')(app);

// Create server
app.listen(port, function(){
  console.log('Listening on port ', port);
});
