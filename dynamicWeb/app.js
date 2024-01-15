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

import connectMongoDBSession from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);
// Connect to MongoDB
dotenv.config();
db();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;
app.use(express.json());
const store = new MongoDBStore({
  uri: 'mongodb+srv://ads_management:ads_management@adsmanagement.as0mvty.mongodb.net/Ads_Management?retryWrites=true&w=majority',
  collection: 'mySessions'
});

// Catch errors
store.on('error', (error) => {
  console.log(error);
});
app.set('trust proxy', 1) 
app.use(session({
  secret: 'This is a secret',
  cookie: {},
  store, 
  resave: false,
  saveUninitialized: true
}));

app.use("/static", express.static(__dirname + "/static"));

app.use(
    express.urlencoded({
        extended: true,
    }),
); 
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
            },
            ifEquals: function(arg1, arg2, options) {
                return arg1 === arg2 ? options.fn(this) : options.inverse(this);
            }
            
        }
    })
);

// trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {}
// }));

// app.set('view engine', 'hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.use(function (req, res, next) {
    // console.log(req.session.auth);
    if (typeof req.session.auth === 'undefined') {
      req.session.auth = false;
      req.session.authUser = null;
    }
  
    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    next();

});

route(app);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
