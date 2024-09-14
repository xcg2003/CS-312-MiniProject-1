import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middle ware to parse the json data
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// array of messages
let pageMessages = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
    res.status(200);
});

// TODO: post does not save right now
app.post('/', (req, res) => {
    const title = req.body.title;
    const username = req.body.username;
    const message = req.body.message;
    if(!title || !username || !message) {
        return res.status(400).send("Username and message are required");
    }
    pageMessages.push({ title, username, message });
    res.redirect('/chatpage');
});

app.get("/chatpage", (req, res) => {
    res.render('displayMessage', { messages: pageMessages });
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});