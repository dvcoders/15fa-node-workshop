function todoAPI (app) {
  // Serving files to http://localhost:PORT
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
  })

  app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/style.css')
  })

  app.get('/todo.js', function (req, res) {
    res.sendFile(__dirname + '/todo.js')
  })

  // TODO: Make a data object ("database") to store all of the Items

  app.get('/all', function (req, res) {
    // TODO: **Send client all of the elements inside our ("database")
  })

  app.post('/item', function (req, res) {
    // TODO: Make sure the values in req.body.KEY are present
    // TODO: **Create a new Item, add it to the "database"
    // TODO: Send the client a "successs" response
  })

  app.put('/item', function (req, res) {
    // TODO: Make sure the values in req.body.KEY are present
    // TODO: Check to make sure the item exists in "database"
    // TODO: **Update any values in "database" from req.body.KEY
    // TODO: Send the client a "success" response
  })

  app.delete('/item', function (req, res) {
    // TODO: Make sure the values in req.body.KEY are present
    // TODO: Check to make sure the item exists in "database"
    // TODO: **Delete the element from the "databse"
    // TODO: Send the client a "success" response
  })
}
module.exports = todoAPI
