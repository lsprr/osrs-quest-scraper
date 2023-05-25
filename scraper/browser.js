import puppeteer from "puppeteer";

async function startBrowser() {
	console.log("Opening the browser...");
	try {
		// Launch a new browser instance
		const browser = await puppeteer.launch({
			headless: true,
			args: ["--disable-setuid-sandbox"],
			'ignoreHTTPSErrors': true
		});
		return browser;
	} catch (err) {
		console.log("Could not create a browser instance => : ", err);
	}
}

export { startBrowser };
