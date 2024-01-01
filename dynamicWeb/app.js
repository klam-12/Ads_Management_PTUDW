import path from 'path';
import express from 'express';
import hbs from 'express-handlebars';
import db from './db/index.js';
import route from './routes/index.js';
import { fileURLToPath } from 'url';
import {errorHandler} from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

import hbs_sections from 'express-handlebars-sections';
import session from 'express-session';

import numeral from 'numeral'

import accountRoute from "./routes/account.route.js"
import formService from "./routes/form.route.js"

// Connect to MongoDB
// db.connectDB();
dotenv.config();
db();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use("/static", express.static(__dirname + "/static"));

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
        helpers: {
            section: hbs_sections(),
            format_number(val) {
              return numeral(val).format('0,0');
            }
        }
    })
);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

// app.set('view engine', 'hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
    res.render('home');
});
route(app);
app.use(errorHandler);

app.use('/account',accountRoute);
app.use('/form',formService);

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
