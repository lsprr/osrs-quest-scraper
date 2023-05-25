import { startBrowser } from "./browser.js";
import { runScraping } from "./pageController.js";

async function scrapeWebsite() {
	let browserInstance = await startBrowser();
	await runScraping(browserInstance);
}

scrapeWebsite();
