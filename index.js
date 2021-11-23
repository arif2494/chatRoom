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
	console.log('New user connected');
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
