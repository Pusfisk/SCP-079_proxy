const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Logger alle indkommende kald til serveren
app.use((req, res, next) => {
    console.log(`Modtog ${req.method} på ${req.url}`);
    next();
});

app.post('/proxy', async (req, res) => {
    console.log("Proxy rute ramt!");
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
        console.error("Fejl i proxy:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server kører!");
});
