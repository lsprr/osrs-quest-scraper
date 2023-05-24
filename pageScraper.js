import { v4 as uuidv4 } from 'uuid';

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
                quest['id'] = uuidv4();
                quest['title'] = await(getText(newPage, '.Product_Detailed_Title > h1'));
                quest['time'] = await getStructuredText(newPage, 'Time:', 'N/A');
                quest['required-quests'] = await getRequirementsAsArray(newPage, 'Quests:');
                quest['required-skills'] = await getRequirementsAsArray(newPage, 'Skills:');
                quest['reward'] = await getRewardAsArray(newPage);
                quest['questPoints'] = await getStructuredText(newPage, 'Quest points gained upon completion:', 'N/A');

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
async function getText(page, selector) {
    return await page.$eval(selector, el => el.textContent.trim());
}

// New function to get structured text
async function getStructuredText(page, prefix, defaultValue = '') {
    try {
        let elements = await page.$$eval('.Customer_content > ul > li > p', elements => elements.map(el => el.textContent));
        let index = elements.findIndex(el => el.includes(prefix));
        return index !== -1 ? elements[index].replace(prefix, '').trim() : defaultValue;
    } catch {
        return defaultValue;
    }
}

// New function to get quest requirements (skills, quests) as an array
async function getRequirementsAsArray(page, prefix, defaultValue = []) {
    try {
        let elements = await page.$$eval('.Customer_content > ul > li > p', elements => elements.map(el => el.textContent));
        let index = elements.findIndex(el => el.includes(prefix));
        if (index !== -1) {
            let values = elements[index].replace(prefix, '').trim();
            // Split by comma and trim each element in the array
            return values.split(',').map(value => value.trim());
        } else {
            return defaultValue;
        }
    } catch {
        return defaultValue;
    }
}

// New function to handle multiple reward lines as an array
async function getRewardAsArray(page, defaultValue = []) {
    try {
        let elements = await page.$$eval('.Customer_content > ul > li > p', elements => elements.map(el => el.textContent));
        let rewardIndex = elements.findIndex(el => el.includes('Reward:'));
        let questPointsIndex = elements.findIndex(el => el.includes('Quest points gained upon completion:'));

        // If "Reward:" not found, return default value
        if(rewardIndex === -1) return defaultValue;

        // Slice the array and return as is, no need to join
        return elements.slice(rewardIndex + 1, questPointsIndex).map(value => value.trim());
    } catch {
        return defaultValue;
    }
}

export default scraperObject;
