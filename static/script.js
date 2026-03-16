document.addEventListener('DOMContentLoaded', function() {
const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('name');
const messageTextarea = document.getElementById('message');
const viewMessagesBtn = document.getElementById('viewMessagesBtn');
const messagesDisplay = document.getElementById('messagesDisplay');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameValue = nameInput.value;
    const messageValue = messageTextarea.value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameValue, message: messageValue })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Message sent successfully!');
        messageForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message.');
    });
});

viewMessagesBtn.addEventListener('click', () => {
    messagesDisplay.innerHTML = '';

    fetch('/messages')
    .then(response => response.json())
    .then(messages => {
        if (messages.length === 0) {
            messagesDisplay.innerHTML = '<p>No messages yet.</p>';
            return;
        }
        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message-item');
            msgDiv.innerHTML = `<strong>${msg.name}</strong>: <p>${msg.message}</p>`;
            messagesDisplay.appendChild(msgDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
        messagesDisplay.innerHTML = '<p>Error loading messages.</p>';
    });
});
});