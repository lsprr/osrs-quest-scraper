import pageScraper from './pageScraper.js';
import fs from 'fs';

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
    // Save the data as JSON
    saveTheDataAsJSON(data);
}

function saveTheDataAsJSON(data) {
    fs.writeFile("data.json", JSON.stringify(data), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The data has been scraped and saved successfully!");
    });
}

export {runScraping};
