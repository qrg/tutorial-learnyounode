"use strict";

var net = require('net');
var port = parseInt(process.argv[2], 10);
var strftime = require('strftime');
var server = net.createServer();

server.listen(port, 'localhost');

server.on('listening', function(){
  console.log('server listening port:', port);
});

server.on('close', function(){
  console.log('server closed.');
});

server.on('connection', function(socket){
  console.log('new connection: ', socket.address());
  var t = strftime('%F %H:%M', new Date());
  socket.end(t);
});

server.on('error', function(e){
  console.error('an error occurs.', e);
});
