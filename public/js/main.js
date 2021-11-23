const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');
const socket = io();
// message from server
socket.on('message', (msg) => {
	console.log(msg);
	showMessage(msg);
});

// submit message
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const msg = messageInput.value;
	// emiting message to sever
	socket.emit('chatMessage', msg);
	messageInput.value = '';
});

// show message to DOM
const showMessage = (msg) => {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
     ${msg}
    </p>`;
	document.querySelector('.chat-messages').appendChild(div);
};
