// Dependencias

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");

// Servicio GET (usando express)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Al momento de existir conexión se ejecuta la función de callback
io.on('connection', function(socket){

    // Emite (publica) en el tópico 'stream' los datos que se publican en redis
	var subLighting    = redis.createClient();
  var subTemperature = redis.createClient();
  var subHumidity    = redis.createClient();
  var subMotion      = redis.createClient();
  var subSmoke       = redis.createClient();
  var subVoltage     = redis.createClient();

	subLighting.subscribe("lighting");
	subLighting.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('lighting', message);
	});

  subTemperature.subscribe("temperature");
	subTemperature.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('temperature', message);
	});

  subHumidity.subscribe("humidity");
	subHumidity.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('humidity', message);
	});

  subMotion.subscribe("motion");
	subMotion.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('motion', message);
	});

  subSmoke.subscribe("smoke");
	subSmoke.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('smoke', message);
	});

  subVoltage.subscribe("voltage");
	subVoltage.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('voltage', message);
	});

});

http.listen(3000, function(){
  console.log('Servidor en el puerto 3000');
});
