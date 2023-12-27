import express from 'express';
import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import session from 'express-session';
import {createRequire} from "module";

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Connect to MongoDB
// db.connectDB();

import accountRoute from "./routes/account.route.js"

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
    engine({
        extname: 'hbs',
        defaultLayout: 'main', // Layout mặc định nếu có
        layoutsDir: path.join(__dirname, 'views/layouts'), // Thư mục chứa layout templates
        partialsDir: path.join(__dirname, 'views/partials'), // Thư mục chứa partials
        helpers: {
            section: hbs_sections(),
            format_number(val) {
              return numeral(val).format('0,0');
            }
          }
    }),
    
);
// app.set('view engine', 'hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
    res.render('home');
});
// route(app);

app.use('/account',accountRoute);

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
