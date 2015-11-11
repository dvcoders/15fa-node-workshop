function todoAPI (app) {
  // items is an Array of Objects
  // Each object will have the following attributes (called keys) and values

  // {id:Number, title: String, completed: Bool}
  var items = []

  app.get('/all', function (req, res) {
    // Send all items
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
    // Search for existing item with ID and update all values
    // Return error is id is not matching
    matchId(req, res)
  })

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
