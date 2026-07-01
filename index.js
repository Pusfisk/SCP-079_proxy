app.post('/proxy', async (req, res) => {
    console.log("Modtog kald fra Roblox!"); // TILFØJ DENNE LINJE
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            // ... resten af din kode

const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/proxy', async (req, res) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT || 3000);
