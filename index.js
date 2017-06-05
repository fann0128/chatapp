var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

io.on('connection', function(socket){
	socket.on('chat.message',function(message) {
		io.emit('chat.message', message)
	})
})

http.listen(3000,function(){
  console.log('server started')
})
