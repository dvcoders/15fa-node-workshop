// for testing todo.js

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Todo Item Data Scheme
// {id:Number, title: String, completed: Bool}
var items = [{Id:0, text:'one', completed:true}, {Id: 1, text:'two', completed:false}];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/items', function(req, res) {
    res.send(items);
});

app.post('/item', function(req, res) {
    var item = {
        Id: id++,
        text: req.body.newitem,
        completed: false
    }
    items.push(item);
    res.send(item);
});

app.put('/item', function(req, res) {
    // Iterate over all of the items
    // If there is a matching item copy replce data
    // Elseif there is no matching id, return error
    items.forEach(function(item) {
        if (item.Id == req.body.Id) {
            Object.keys(req.body).forEach(function(key) {
                item[key] = req.body[key];
            });
        }
    });
    console.log(items);
});

app.listen(8000);
