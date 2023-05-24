import pageScraper from './pageScraper.js';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const OUTPUT_FILE = "data.json";

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
    await saveTheDataAsJSON(data);
}

async function saveTheDataAsJSON(data) {
    try {
        await writeFile(OUTPUT_FILE, JSON.stringify(data, null, 4), 'utf8');
        console.log(`The data has been scraped and saved successfully in ${OUTPUT_FILE}!`);
        process.exit(0);
    } catch (err) {
        console.error("Error while saving data: ", err);
        process.exit(1);
    }
}

export {runScraping};
