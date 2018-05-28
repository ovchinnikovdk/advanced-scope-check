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
  console.log('URI: /check');
  console.log(req);
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


app.get('/', function(req, res){
	console.log(req);
	res.statusCode = 200;
	res.json({status: "OK"});
});


app.get('/authorize.do', function(req, res){
  res.statusCode = 200;
  res.header('x-selected-scope', 'info');
  res.json({code: '00000000000000000000000000000000'});
});


app.get('/token.do', function(req, res) {
  console.log('GET token.do');
  res.json({client_id : "5e0a9cbc-bd80-462b-9c79-fc266374bb31",
                    not_after : 174364070,
                    not_after_text : "2018-07-11T02:27:50Z",
                    not_before : 174360470,
                    not_before_text : "2017-07-11T01:27:50Z",
                    grant_type : "code",
                    consented_on : 1499736470,
                    consented_on_text : "2059-07-11T01:27:50Z",
                    resource_owner : "cn=spoon,email=spoon@poon.com",
                    scope : "jointaccount mutual",
                    miscinfo : "[r:gateway]"
                  });
});
app.post('/token.do', function(req, res){
  console.log('URI: /access_token');
  //console.log(req);
  res.json({client_id : "5e0a9cbc-bd80-462b-9c79-fc266374bb31",
                    not_after : 174364070,
                    not_after_text : "2018-07-11T02:27:50Z",
                    not_before : 174360470,
                    not_before_text : "2017-07-11T01:27:50Z",
                    grant_type : "code",
                    consented_on : 1499736470,
                    consented_on_text : "2059-07-11T01:27:50Z",
                    resource_owner : "cn=spoon,email=spoon@poon.com",
                    scope : "jointaccount mutual",
                    miscinfo : "[r:gateway]"
                  });
});
/*app.options('/token.do', function(req, res){
  console.log("OPTIONS TO TOKEEN");
});*/

app.post('/introspect', function(req, res){
  console.log('URI: /introspect');
  console.log(req);
  res.statusCode = 200;
  res.json({active : true});
});

/*var fs = require('fs');
var privateKey = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');

var credentials = {key : privateKey, cert: certificate};
var https = require('https');
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.get('https_port'), function(){
  console.log('httpsServer running on port ' + config.get('https_port'));
}); */

//Listen port
app.listen(process.env.PORT || config.get('port'), function() {
  console.log('Express server listenning port ' + config.get('port'));
});
