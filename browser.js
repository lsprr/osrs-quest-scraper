import puppeteer from "puppeteer";

async function startBrowser() {
    let browser;
    try {
        console.log("Starting the browser...");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Error starting the browser => : ", err);
    }
    return browser;
}

export {startBrowser};
