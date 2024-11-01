function cleanResponse(text) {
    // Replace multiple line breaks with a single line break
    return text.replace(/\n+/g, '\n').trim();
}

document.getElementById('sendButton').addEventListener('click', async () => {
    const userMessage = document.getElementById('userInput').value;
    if (!userMessage.trim()) return; // Prevent empty messages
    document.getElementById('userInput').value = ''; // Clear input field

    // Display the user's message in the chat window
    appendMessage(userMessage, 'user');

    // Display loading animation in the chat window
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'bot-response');
    loadingMessage.innerHTML = `<strong>Bot:</strong> <span class="loading">Typing...</span>`;
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.appendChild(loadingMessage);
    responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to the bottom

    // Fetch the bot's response from the server
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });

    // Remove loading animation once response is received
    responseContainer.removeChild(loadingMessage);

    // Process the response and display it
    const data = await response.json();
    
    const cleanedReply = cleanResponse(data.reply);
    appendMessage(cleanedReply, 'bot');
});

// Function to append messages to the chat window
function appendMessage(message, sender) {
    const responseContainer = document.getElementById('responseContainer');

    // Create a wrapper for the question and answer
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');

    // Create the message div for the user's or bot's message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-response');
    messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${message}`; // Label the sender

    // Append the message to the message wrapper
    messageWrapper.appendChild(messageDiv);

    // Append the message wrapper to the response container
    responseContainer.appendChild(messageWrapper);
    responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to the bottom
}



