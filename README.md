# OSRS Quest Scraper

OSRS Quest Scraper is a powerful, efficient, and easy-to-use web scraper built with Node.js, specifically designed to scrape data from the Old School Runescape (OSRS) Quests List.

## Features
- **Easy to Use**: The clear structure and well-defined scripts make OSRS Quest Scraper a user-friendly tool even for those with little to no scraping experience.
- **Efficient**: Built with Puppeteer, OSRS Quest Scraper navigates the web at high speed and collects data efficiently.
- **Server Included**: This tool includes a built-in server which allows for instant deployment and use.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/lsprr/osrs-quest-scraper.git
   ```
2. Navigate to the project directory:
   ```
   cd osrs-quest-scraper
   ```
3. Install the necessary dependencies:
   ```
   npm install
   ```
4. Run the scraper or the server:
   ```
   npm run scraper
   ```
   or
   ```
   npm run server
   ```

## Structure

```
osrs-quest-scraper
│   .gitignore
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│   vercel.json
│
├───data
│       data.json
│
├───scraper
│       browser.js
│       index.js
│       pageController.js
│       pageScraper.js
│
└───server
        server.js
```
- **/scraper**: This directory contains the main scraping logic.
- **/server**: This directory contains the server logic.
- **data.json**: This file is where the scraped data will be stored.

## Scripts

- **scraper**: Runs the main scraper file and collects the data.
- **server**: Starts the server.

## Dependencies

- **Express**: A minimalist web framework for Node.js.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Puppeteer**: A Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
- **UUID**: A library to generate RFC4122 UUIDs.

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

## Support

If you encounter any problems or have any suggestions, please open an issue [here](https://github.com/lsprr/osrs-quest-scraper/issues).

## Author

This project is proudly created by [lsprr](https://github.com/lsprr).

## Links

- [GitHub](https://github.com/lsprr/osrs-quest-scraper)
- [Issues](https://github.com/lsprr/osrs-quest-scraper/issues)

With the OSRS Quest Scraper, harvesting the data you need from the Old School Runescape (OSRS) Quests List has never been easier. Happy scraping!
