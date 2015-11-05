module.exports = function(app) {
  
  app.get('/', function(req, res) {
    var name = req.query.name || "you";

    res.json({ 
      message: 'Hey ' + name + ", how are you?"
    });
  });

  app.post('/', function(req, res) {
    res.send(req.body);
  });
};
