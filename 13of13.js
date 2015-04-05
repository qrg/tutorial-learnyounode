"use strict";

var http = require('http');
var url = require('url');
var port = Number(process.argv[2]);

if (!port) {
  return console.error('undefined port.');
}

var server = http.createServer();
var routes = {
  '/api/parsetime': 'parseTime',
  '/api/unixtime': 'unixtime'
};
var controllers = {};

var router = function(req, res){
  var p = url.parse(req.url, true);
  var patterns = Object.keys(routes);

  var matched = patterns.some(function(val, index, list){
    if (val === p.pathname) {
      controllers[routes[val]](req, res, p.query);
      return true;
    }
    return false;
  });

  if (!matched) {
    console.error('no matched api.');
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end();
  }
};

controllers.parseTime = function(req, res, query){
  console.log('called parseTime.');
  if (typeof query === 'undefined' || query === null || typeof query.iso === 'undefined' || query.iso === null) {
    console.error('Bad Request. query.iso is undefined.');
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end();
  }

  var date = new Date(query.iso);
  var json = JSON.stringify({
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(json);
  res.end();
};

controllers.unixtime = function(req, res, query){
  console.log('called unixtime.');
  if (typeof query === 'undefined' || query === null || typeof query.iso === 'undefined' || query.iso === null) {
    console.error('Bad Request. query.iso is undefined.');
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end();
  }

  var date = new Date(query.iso);
  var json = JSON.stringify({
    unixtime: date.getTime()
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(json);
  res.end();
};

server.on('request', function(req, res){
  router(req, res);
});

server.on('listening', function(){
  console.log('server listening port:', port);
});

server.on('close', function(){
  console.log('server closed.');
});

server.on('error', function(e){
  console.error('an error occurs.', e);
});

server.listen(port);
