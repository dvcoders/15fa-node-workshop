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

  // items is a map of objects
  // Each object will have the following attributes (called keys) and values

  // {id:Number, title: String, completed: Bool}
  var items = new Map()
  app.get('/all', function (req, res) {
    var itemArray = []

    for (var key in items) {
      itemArray.push(items[key])
    }

    res.send({
      'items': itemArray
    })
  })

  app.post('/item', function (req, res) {
    var body = req.body

    if (!body.title) return sendResponse(res, 400, 'No title included')
    if (!body.completed) return sendResponse(res, 400, 'No completion boolean included')

    var keysArray = []
    for (var key in items) {
      keysArray.push(key)
    }
    var newItem = {
      'id': (keysArray.length + 1),
      'title': body.title,
      'completed': body.completed
    }
    items[newItem.id] = newItem
    console.log('Successfully posted: ' + JSON.stringify(newItem))
    res.send(newItem)
  })

  app.put('/item', function (req, res) {
    var body = req.body

    // make sure id is given and is in database
    if (!body.id) return sendResponse(res, 400, 'No id included')
    if (!(body.id in items)) return sendResponse(res, 404, 'Item not found')

    // ONLY apply changes to what is provided in the body, otherwise nothing changes
    if (body.title) items[body.id]['title'] = body.title
    if (body.completed) items[body.id]['completed'] = body.completed
    console.log('Successfully updated id #' + body.id + ' ')
    sendResponse(res, 200, JSON.stringify(items[body.id]))
  })

  app.delete('/item', function (req, res) {
    var body = req.body

    if (!body.id) return sendResponse(res, 400, 'No id included')
    if (!(body.id in items)) return sendResponse(res, 404, 'Item not found')

    var copyItem = items[body.id]
    delete items[body.id]
    sendResponse(res, 200, JSON.stringify(copyItem))
  })

  function sendResponse (res, statusCode, message) {
    res.status(statusCode).json({
      code: statusCode,
      message: message
    })
    console.log(message)
  }
}
module.exports = todoAPI
