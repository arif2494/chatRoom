const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const PORT = process.env.PORT || 5000;
// set static folder
app.use(express.static('public'));

// run when client connects

io.on('connection', (socket) => {
	// welcome current user
	socket.emit('message', 'Welcome to the chatRoom app');
	// broadcast when a user connects
	socket.broadcast.emit('message', 'A new user has joined the chatRoom');

	// runs when client disconnects
	socket.on('disconnect', () => {
		io.emit('message', 'A user has left the chatRoom');
	});

	// listen for chat message
	socket.on('chatMessage', (msg) => {
		io.emit('message', msg);
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
