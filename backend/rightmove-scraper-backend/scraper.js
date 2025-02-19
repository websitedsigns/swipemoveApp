import puppeteer from 'puppeteer';

async function scrapeRightmove(searchUrl) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    const properties = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.propertyCard')).map(card => ({
            title: card.querySelector('.propertyCard-title')?.textContent?.trim() || 'No title',
            price: card.querySelector('.propertyCard-priceValue')?.textContent?.trim() || 'No price',
            link: card.querySelector('.propertyCard-link')?.getAttribute('href') ? 'https://www.rightmove.co.uk' + card.querySelector('.propertyCard-link')?.getAttribute('href') : '#',
            image: card.querySelector('.propertyCard-img img')?.src || 'No image'
        }));
    });

    await browser.close();
    return properties;
}

export { scrapeRightmove };
