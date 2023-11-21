const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const route = require('./routes');

// Connect to MongoDB
// db.connectDB();

const app = express();
const port = 3000;
app.use(express.static(__dirname + 'static'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'main', // Layout mặc định nếu có
        layoutsDir: path.join(__dirname, 'views/layouts'), // Thư mục chứa layout templates
        partialsDir: path.join(__dirname, 'views/partials'), // Thư mục chứa partials
    }),
);
// app.set('view engine', 'hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('home');
});
// route(app);

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
