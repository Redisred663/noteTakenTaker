const express = require('express');
const path = require('path');
// Import the route js, connected with notes.js to be made.
const routes = require('./public/routes/servindex.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/notes', routes);
// Bring in html pages from public file, not any other, don't change it me.
app.use(express.static('public'));

// Homepage routing.
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/404', (req, res) =>
res.sendFile(path.join(__dirname, '/public/404.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://locahost:${PORT}`)
);
