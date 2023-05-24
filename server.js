import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.get('/api/quests', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data.json'));
        const quests = JSON.parse(data);
        res.json(quests);
    } catch (err) {
        res.status(500).send({ message: 'Error reading quests data.' });
    }
});

app.listen(port, () => {
    console.log(`OSRS Quest Scraper API listening at http://localhost:${port}`);
});
