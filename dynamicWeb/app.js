import path from 'path';
import express from 'express';
import hbs from 'express-handlebars';
import db from './db/index.js';
import route from './routes/index.js';
import { fileURLToPath } from 'url';
import {errorHandler} from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();
db();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views/layouts'), 
        partialsDir: path.join(__dirname, 'views/partials')
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('home');
});
route(app);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
