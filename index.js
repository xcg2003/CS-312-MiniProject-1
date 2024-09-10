import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
    res.status(200);
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    res.status(200);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});