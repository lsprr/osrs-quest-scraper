import {startBrowser} from "./browser.js";
import scraperController from "./pageController.js";

async function scrapeWebsite() {
    let browserInstance = await startBrowser();
    await scraperController(browserInstance);
}

scrapeWebsite();
