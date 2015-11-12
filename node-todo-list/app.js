var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')

// Set Port
var port = process.env.PORT || 3000

// Apply Cors middleware
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Require all routes in /routes
// These are the endpoints of the API we can call
require('./routes-todo')(app)

// Create server
app.listen(port, function () {
  console.log('Listening on port ', port)
})
