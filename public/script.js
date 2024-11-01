// script.js

document.getElementById('sendButton').addEventListener('click', async () => {
    const userMessage = document.getElementById('userInput').value;

    // Send the message to the server
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    // Format and render the response
    document.getElementById('responseContainer').innerHTML = formatResponse(data.reply);
});

// Function to format the response
function formatResponse(responseText) {
    // Basic formatting
    let formattedResponse = responseText
        .replace(/## (.+)/g, '<h2>$1</h2>')   // Replace ## with <h2>
        .replace(/### (.+)/g, '<h3>$1</h3>')  // Replace ### with <h3>
        .replace(/\n/g, '<br>')                // Replace new lines with <br>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic text
        .replace(/- (.+)/g, '<li>$1</li>')     // List items
        .replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>'); // Wrap list items in <ul>

    return `<div>${formattedResponse}</div>`; // Wrap in a div to style as needed
}
