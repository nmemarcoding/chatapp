const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMassages = document.querySelector('.chat-messages');

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMassages.scrollTop = chatMassages.scrollHeight;
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
})

const outputMessage = message => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);

}