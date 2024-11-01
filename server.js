
/*const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Gemini Chatbot!</h1><p>Use /chat to interact with the chatbot.</p>');
});

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const result = await model.generateContent(userMessage);
        const botReply = result.response.text(); // Extract the response text
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error communicating with Gemini:', error);
        res.status(500).json({ error: 'An error occurred while contacting the chatbot.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});*/

const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle chat messages
/*app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const result = await model.generateContent(userMessage);
        const botReply = result.response.text(); // Extract the response text
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error communicating with Gemini:', error);
        res.status(500).json({ error: 'An error occurred while contacting the chatbot.' });
    }
});*/

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const result = await model.generateContent(userMessage);
        const botReply = formatResponse(result.response.text());
        //res.json({ reply: botReply });
        // Assuming you have a div with id "responseContainer" for displaying the chatbot's reply
        res.json({ reply: botReply });

    } catch (error) {
        console.error('Error communicating with Gemini:', error);
        res.status(500).json({ error: 'An error occurred while contacting the chatbot.' });
    }
});

// Helper function to format the response
function formatResponse(responseText) {
    // Replace newlines with paragraph tags for better spacing
    let formattedText = responseText.replace(/\n/g, '<br><br>');

    // Format sections with specific keywords as headings
    formattedText = formattedText.replace(/## (.*?)<br>/g, '<h2>$1</h2>'); // Convert ## to <h2>
    formattedText = formattedText.replace(/### (.*?)<br>/g, '<h3>$1</h3>'); // Convert ### to <h3>

    // Format bullet points (assuming they start with '*')
    formattedText = formattedText.replace(/\*\s(.*?)(<br>|$)/g, '<li>$1</li>'); // Convert * to <li>
    formattedText = formattedText.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>'); // Wrap <li> in <ul>

    // Emphasize key terms with bold
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert **text** to <strong>

    return formattedText; // Return the formatted HTML string
}



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

