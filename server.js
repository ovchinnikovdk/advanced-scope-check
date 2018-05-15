var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var config = require('./config');



var app = express();

//uses

app.use(favicon('./favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());


//Handlers

app.post('/check', function(req, res) {
  res.statusCode = 200;
  res.json({statusCode : 200});
  console.log(req.body.access_token.scope);
  console.log(req.body['api-scope-required']);
  req.body.access_token.scope.split(' ').forEach(function(role) {
    if (!req.body['api-scope-required'].includes(role)) {
      res.statusCode = 400;
      return;
    }
  });
});


//Listen port
app.listen(config.get('port'), function() {
  console.log('Express server listenning port ' + config.get('port'));
});
