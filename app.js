const express = require('express'),
      logResponseTime = require('./util/response-time-logger'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      multer = require('multer'),
      parser = require('parser'),
      request = require('request-promise-cache'),
      path = require('path'),
      dotenv = require('dotenv').config(),
      promise = require('promise'),
      expressWs = require('express-ws')(app);
      
app.use(logResponseTime);

const port = process.env.PORT;

app.set('socketio', io);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

//routes
const app_index_route = require('./routes/app/index');
      
app.use('/', app_index_route);



//Express Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;

app.start = app.listen = function(){
    return server.listen.apply(server, arguments)
}

app.start(process.env.PORT, () => {
    console.log('homebase V1 has started')
    console.log('accu: ' + process.env.accu_weather_key)
})