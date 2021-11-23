const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');
const socket = io();

socket.on('message', (msg) => {
	console.log(msg);
});

// submit message
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const msg = messageInput.value;
	// emiting message to sever
	socket.emit('chatMessage', msg);
	messageInput.value = '';
});
