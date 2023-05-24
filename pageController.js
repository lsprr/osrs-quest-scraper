import pageScraper from './pageScraper.js';

async function scrapeAll(browserInstance) {
    // Open a new browser instance
    let browser = await browserInstance;
    // Run the scraper
    await pageScraper.scraper(browser);
    // Return the scraped data
    return pageScraper.data;
}

async function runScraping(browserInstance) {
    // Get the data
    const data = await scrapeAll(browserInstance);
    console.log(data);
}

export { runScraping };
