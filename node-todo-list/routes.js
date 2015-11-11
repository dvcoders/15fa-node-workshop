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

  // items is an Array of Objects
  // Each object will have the following attributes (called keys) and values

  // {id:Number, title: String, completed: Bool}
  var items = []
  app.get('/all', function (req, res) {
    res.send(items)
  })

  app.post('/item', function (req, res) {
    var body = req.body
    if (!body.id) return sendResponse(res, 400, 'No ID included')
    if (!body.title) return sendResponse(res, 400, 'No title included')
    if (body.completed === '') return sendResponse(res, 400, 'No completion boolean included')

    var newItem = {
      'id': body.id,
      'title': body.title,
      'completed': body.completed
    }
    items.push(newItem)
    res.send('Successfully posted: ' + JSON.stringify(newItem))
  })

  app.put('/item/:id?', function (req, res) {
    matchId(req, res)
  })

  // Helper functions
  //
  function matchId (req, res) {
    var found = false
    var searchId = req.params.id ? Number(req.params.id) : Number(req.query.id)
    items.forEach(function (item) {
      if (item.id === searchId) {
        found = true
        item.title = req.body.title
        item.completed = req.body.completed
        sendResponse(res, 200, 'Successfully updated element ' + searchId + ' with ' + req.body.title + ' ' + req.body.completed)
      }
    })
    if (!found) sendResponse(res, 409, 'Item with ID ' + searchId + ' could not be found')
  }

  function sendResponse (res, statusCode, message) {
    res.status(statusCode).json({
      code: statusCode,
      message: message
    })
    console.log(message)
  }
}
module.exports = todoAPI
