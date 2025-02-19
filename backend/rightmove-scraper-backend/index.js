import express from 'express';
import cors from 'cors';
import { scrapeRightmove } from './scraper.js';

const app = express();
app.use(cors()); // Allow frontend to access backend
app.use(express.json());

app.get('/scrape', async (req, res) => {
    const { location, minPrice, maxPrice } = req.query;

    const searchUrl = `https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
        const properties = await scrapeRightmove(searchUrl);
        res.json(properties);
    } catch (error) {
        console.error('Scraping failed:', error); // Logs error to console
        res.status(500).json({ error: 'Scraping failed', details: error.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
