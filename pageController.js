import pageScraper from './pageScraper.js';

async function scrapeAll(browserInstance) {
    let browser;
    try {
        // Open a new browser instance
        browser = await browserInstance;
        // Scrape the page(s)
        await pageScraper.scraper(browser);
    } catch (err) {
        console.log("Error opening the browser => ", err);
    }
}

export default scrapeAll;
