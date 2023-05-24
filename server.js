import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));

app.get('/api/quests', async (req, res, next) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data.json'));
        const quests = JSON.parse(data);
        res.json(quests);
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({message: 'Internal server error.'});
});

app.listen(port, () => {
    console.log(`OSRS Quest Scraper API listening at http://localhost:${port}`);
});
