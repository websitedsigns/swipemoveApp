import puppeteer from 'puppeteer';

export async function scrapeRightmove(searchUrl) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set user-agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.rightmove.co.uk'
    });

    console.log('Navigating to:', searchUrl);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for property cards to load
    await page.waitForSelector('.propertyCard', { timeout: 5000 });

    // Scroll to load more content
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(2000);

    // Extract property details
    const properties = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.propertyCard')).map(card => ({
            title: card.querySelector('.propertyCard-title')?.textContent?.trim() || 'No title',
            price: card.querySelector('.propertyCard-priceValue')?.textContent?.trim() || 'No price',
            link: card.querySelector('.propertyCard-link')?.href 
                ? 'https://www.rightmove.co.uk' + card.querySelector('.propertyCard-link')?.getAttribute('href') 
                : '#',
            image: card.querySelector('.propertyCard-img img')?.src || 'No image'
        }));
    });

    console.log('Scraped properties:', properties);

    await browser.close();
    return properties;
}
