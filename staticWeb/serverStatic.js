const path = require('path');
const express = require('express');

const app = express();
const port = 8000;

app.use('/static', express.static('staticWeb/static/'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on por ${port}`);
});
