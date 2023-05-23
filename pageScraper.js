const scraperObject = {
    url: 'https://www.rsbee.com/quest-help',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.Helper_content_left');
        // Get the link to all the required quests
        let urls = await page.$$eval('.Helper_content_left ul > li', links => {
            // Extract the link and title from each list item
            return links.map(link => {
                const href = link.querySelector('span > a').href;
                return href;
            });
        });

        console.log(urls);
    }
}

export default scraperObject;
