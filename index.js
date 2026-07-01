const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Denne blok skal erstatte din nuværende app.post('/proxy'...)
app.post('/proxy', async (req, res) => {
    try {
        console.log("Modtog fra Roblox:", JSON.stringify(req.body));
        
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
        console.error("Fejl:", error);
        res.status(500).json({ error: error.message });
    }
});

// Sørg for at denne står nederst
app.listen(process.env.PORT || 3000);
