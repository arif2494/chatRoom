const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const PORT = process.env.PORT || 5000;
// set static folder
app.use(express.static('public'));

// run when client connects
const botName = 'chatRoom Bot';

io.on('connection', (socket) => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);
		// join room
		socket.join(user.room);
		// welcome current user
		socket.emit('message', formatMessage(botName, 'Welcome to the chatRoom app'));
		// broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit('message', formatMessage(botName, `${user.username} has joined the chatRoom`));

		// send users and room info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room)
		});
	});

	// runs when client disconnects
	socket.on('disconnect', () => {
		const user = userLeave(socket.id);

		if (user) {
			io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chatRoom`));

			// send users and room info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room)
			});
		}
	});

	// listen for chat message
	socket.on('chatMessage', (msg) => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
