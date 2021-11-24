const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const joinedUser = document.getElementById('users');
// Get USer name from URL
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true
});
const socket = io();
//Join chatroom
socket.emit('joinRoom', { username, room });

// get room and users
socket.on('roomUsers', ({ room, users }) => {
	showRoomName(room);
	showUsers(users);
});

// message from server
socket.on('message', (msg) => {
	console.log(msg);
	showMessage(msg);
	// scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

// submit message
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const msg = messageInput.value;
	// emiting message to sever
	socket.emit('chatMessage', msg);
	messageInput.value = '';
	messageInput.focus();
});

// show message to DOM
const showMessage = (msg) => {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `<p class="meta">${msg.userName} <span>${msg.time}</span></p>
    <p class="text">
     ${msg.text}
    </p>`;
	document.querySelector('.chat-messages').appendChild(div);
};

// show room name
const showRoomName = (room) => {
	roomName.innerText = room;
};

// show users
const showUsers = (users) => {
	joinedUser.innerHTML = `
		${users.map((user) => `<li>${user.username}</li>`).join('')}
		`;
};
