import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.ambassify.com%2F&strategy=MOBILE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=PWA&category=SEO&key=[your-key]

const API_KEY = process.env.API_KEY;
const PAGESPEED_INSIGHTS_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const CATEGORIES = '&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=PWA&category=SEO';
const port = 5000;
const app = express();

app.use(cors());
app.get('/performance', async (req, res) => {
    const { url, strategy } = req.query;

    try {
        const response = await fetch(`${PAGESPEED_INSIGHTS_API_URL}?url=${url}&strategy=${strategy}${CATEGORIES}&key=${API_KEY}`);
        const result = await response.json();

        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
