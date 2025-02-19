import express from 'express';
import { scrapeRightmove } from './scraper.js';  // Import the scraper function

const app = express();
const port = 3001;

// Test route to verify the server is running
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Route for scraping Rightmove properties
app.get('/scrape-properties', async (req, res) => {
    const searchUrl = 'https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E87490&index=0&propertyTypes=&mustHave=&dontShow=&furnishTypes=&keywords='; 
    try {
        const properties = await scrapeRightmove(searchUrl);
        res.json(properties);  // Return scraped property data as JSON
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Failed to scrape properties' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
