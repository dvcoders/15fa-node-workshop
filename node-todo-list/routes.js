function todoAPI (app) {
  // DATA
  // Todo Item Data Scheme
  // {id:Number, title: String, completed: Bool}
  var items = []

  app.get('/items', function (req, res) {
    // Send all items
    res.send(items)
  })

  app.post('/item', function (req, res) {
    // Create a new item with provided data
    // items.push(item)
    // res.send(item)
  })

  app.put('/item', function (req, res) {
    // Search for existing item with ID and update all values
    // Return error is id is not matching
  })
}

module.exports = todoAPI
