var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/bricodata');


var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var models = fs.readdirSync('app/models');
models.forEach(function (model) {
  if (model.substr(-3) === '.js') {
    restify.serve(app, require('./app/models/'+model)(mongoose, Schema));
  }
});

var queue = {
  next: [],
  past: []
};


app.get('/queue', function(req, res){
  res.send(JSON.stringify(queue));
});
app.get('/queue/size', function(req, res){
  res.send({size : queue.next.length});
});
app.get('/queue/current', function(req, res){
  if(queue.next.length > 0){
    var id = queue.next[0];
    var user = queue[id];
    res.send(JSON.stringify(user));
  }else{
    var user = '{"default":true,"addedToWaitlist":false,"id":4295,"qa":{"545f70d9946ea453ece17e7e":{"question":{"_id":"545f70d9946ea453ece17e7e","text":"Sélectionnez une gamme de produit"},"answer":{"_id":"5468aefc6564b204f8cde019","questionId":"545f70d9946ea453ece17e7e","text":"Peinture","nextUrl":"question/545f70d9946ea453ece17e7f"}}},"products":{}}';
    res.send(user);
  }
});
app.get('/queue/clear', function(req, res){
  queue = {
    next: [],
    past: []
  };
  res.send(JSON.stringify(queue));
});
app.get('/queue/next', function(req, res){
  queue.past.push(queue.next.shift());
  if(queue.next.length > 0){
    var id = queue.next[0];
    var user = queue[id];
    res.send(JSON.stringify(user));
  }else{
    var user = '{"default":true,"addedToWaitlist":false,"id":4295,"qa":{"545f70d9946ea453ece17e7e":{"question":{"_id":"545f70d9946ea453ece17e7e","text":"Sélectionnez une gamme de produit"},"answer":{"_id":"5468aefc6564b204f8cde019","questionId":"545f70d9946ea453ece17e7e","text":"Peinture","nextUrl":"question/545f70d9946ea453ece17e7f"}}},"products":{}}';
    res.send(user);
  }
});

app.post('/queue/updateUser', function(req, res){
  var user = req.param('user');
  queue[user.id] = user;
  res.send("ok");
});
app.post('/queue/addUser', function(req, res){
  var user = req.param('user');
  if(queue[user.id] === undefined){
    queue[user.id] = user;
    queue.next.push(user.id);
  } 
  res.send("ok");
});


http.createServer(app).listen(3000, function() {
  console.log("Express server listening on port 3000");
});
