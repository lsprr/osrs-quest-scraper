const scraperObject = {
    url: 'https://www.rsbee.com/quest-help',
    async scraper(browser) {
        // Open a new page in the browser
        let page = await browser.newPage();
        // Go to the URL
        await page.goto(this.url);
        // Wait until the page has fully loaded
        await page.waitForSelector('.Helper_content_left');

        // Get all the quest links from the page
        let urls = await page.$$eval('.Helper_content_left ul > li', links => {
            return links.map(link => link.querySelector('span > a').href);
        });

        // Go through each link and scrape the necessary data
        for (let url of urls) {
            try {
                // Open a new page for the link
                let newPage = await browser.newPage();
                await newPage.goto(url);

                // Get the necessary data from the page
                let data = {};
                data['time'] = await getText(newPage, '.Customer_content > ul > li > p:first-of-type', 'Time:');
                data['required-quests'] = await getText(newPage, '.Customer_content > ul > li > p:nth-of-type(3)', 'Quests:');
                data['required-skills'] = await getText(newPage, '.Customer_content > ul > li > p:nth-of-type(4)', 'Skills:');
                data['reward'] = await getReward(newPage);
                data['questPoints'] = await getText(newPage, '.Customer_content > ul > li > p:last-of-type', 'Quest points gained upon completion:');

                // New function to handle multiple reward lines
                async function getReward(page) {
                    // Get all p elements in the list
                    let elements = await page.$$eval('.Customer_content > ul > li > p', elements => elements.map(el => el.textContent));

                    // Find the index of the p element containing 'Reward:'
                    let rewardIndex = elements.findIndex(el => el.includes('Reward:'));
                    // Find the index of the p element containing 'Quest points gained upon completion:'
                    let questPointsIndex = elements.findIndex(el => el.includes('Quest points gained upon completion:'));

                    // Return the joined text of all p elements between 'rewardIndex' and 'questPointsIndex'
                    return elements.slice(rewardIndex + 1, questPointsIndex).join('\n');
                }

                await newPage.close();
            } catch (err) {
                console.log(`Error scraping ${url}: ${err}`);
            }
        }
    }
};

async function getText(page, selector, prefix, extraPrefixes = []) {
    let text = await page.$eval(selector, el => el.textContent);
    text = text.replace(prefix, '').trim();

    // Remove additional prefixes, if provided
    for (let extraPrefix of extraPrefixes) {
        text = text.replace(extraPrefix, '').trim();
    }

    return text;
}

export default scraperObject;
