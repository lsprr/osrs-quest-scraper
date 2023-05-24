const scraperObject = {
    url: 'https://www.rsbee.com/quest-help',
    data: [],

    async scraper(browser) {
        // Open a new page in the browser
        let page = await browser.newPage();
        // Go to the URL
        await page.goto(this.url);
        // Wait until the page has fully loaded
        await page.waitForSelector('.Helper_content_left');

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
                let quest = {};
                quest['time'] = await getText(newPage, '.Customer_content > ul > li > p:first-of-type', 'Time:');
                quest['required-quests'] = await getText(newPage, '.Customer_content > ul > li > p:nth-of-type(3)', 'Quests:');
                quest['required-skills'] = await getText(newPage, '.Customer_content > ul > li > p:nth-of-type(4)', 'Skills:');
                quest['reward'] = await getReward(newPage);
                quest['questPoints'] = await getText(newPage, '.Customer_content > ul > li > p:last-of-type', 'Quest points gained upon completion:');

                // Store the data
                this.data.push(quest);

                await newPage.close();
            } catch (err) {
                console.log(`Couldn't get data from ${url}: ${err}`);
            }
        }
    }
};

// New function to remove the prefix and any extra spaces.
async function getText(page, selector, prefix) {
    let text = await page.$eval(selector, el => el.textContent);
    return text.replace(prefix, '').trim();
}

// New function to handle multiple reward lines
async function getReward(page) {
    let elements = await page.$$eval('.Customer_content > ul > li > p', elements => elements.map(el => el.textContent));

    // Get the rewards text
    let rewardIndex = elements.findIndex(el => el.includes('Reward:'));
    let questPointsIndex = elements.findIndex(el => el.includes('Quest points gained upon completion:'));

    return elements.slice(rewardIndex + 1, questPointsIndex).join('\n');
}

export default scraperObject;
