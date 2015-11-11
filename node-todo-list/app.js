// for testing todo.js

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var items = [{Id:0, text:'one', completed:true}, {Id: 1, text:'two', completed:false}];
// format: {ID, text, completed}
var id = 2;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + '/style.css');
});

app.get('/todo.js', function(req,res) {
    res.sendFile(__dirname + '/todo.js');
});

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

app.delete('/item', function(req, res) {
    items.forEach(function(item, ind) {
        if (item.Id == req.body.Id)
            items.splice(ind, 1);
    });
    res.end();
});

app.put('/item', function(req, res) {
    items.forEach(function(item) {
        if (item.Id == req.body.Id) {
            Object.keys(req.body).forEach(function(key) {
                item[key] = req.body[key];
            });
        }
    });
    res.end();
});

app.listen(8000);
