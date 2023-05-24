import puppeteer from "puppeteer";

async function startBrowser() {
    console.log("Opening the browser...");
    let browser = await puppeteer.launch({headless: true});
    return browser;
}

export {startBrowser};
