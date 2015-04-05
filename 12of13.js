"use strict";

var http = require('http');
var map = require('through2-map');

var port = process.argv[2];

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase();
  })).pipe(res);
});

server.listen(port);

server.on('listening', function(){
  console.log('server listening port:', port);
});

server.on('close', function(){
  console.log('server closed.');
});

server.on('error', function(e){
  console.error('an error occurs.', e);
});
