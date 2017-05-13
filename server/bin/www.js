//#!/usr/bin/env node

/**
 * Module dependencies.
 */

var http = require('http');
var app = require('../../server');
var debug = require('debug')('reference:server');
var latest = require('../feature/newsScrapper');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
required:true
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}

var users=[];
io.set("origins", "*:*");
io.on('connection', function (client) {
  console.log("Connection established with client");
        client.on('register',(data) => {
            client.uid = data.uid;
            users.push(client.uid);
            console.log("connected user id:"+data.uid);
            client.emit('count'+client.uid , {msg:data.user});
        })
        client.on("getLatest",(data) => {
          console.log("latest alert:"+data.alertId);
          var lr = latest.getLatestUpdates(data.alertId).then((d) => {
            console.log("latest data:"+d.length);
            client.emit("latestReference"+data.alertId,d);
          });
        })
});