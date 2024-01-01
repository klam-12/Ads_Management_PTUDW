import express from 'express';
import hbs from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import session from 'express-session';
import {createRequire} from "module";

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import numeral from 'numeral'

import adminRoute from './routes/admin.route.js';
import accountRoute from "./routes/account.route.js"
import formService from "./routes/form.route.js"

// Connect to MongoDB
// db.connectDB();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use("/static", express.static(__dirname + "\\static"));

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
// route(app);

app.use('/account',accountRoute);
app.use('/form',formService);
app.use('/admin', adminRoute);

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
