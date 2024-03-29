const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./config/passport.config');

const expressSession = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = `mongodb+srv://valentin-vio:${process.env.DATABASE_PASSWORD}@cluster0.9tmpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(dbUrl);
mongoose.connection.on('connected', () => {
    console.log('Mongoose DB connected!');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose DB error!', err);
});

require('./models/user.model');
require('./models/product.model');
require('./models/order.model');

app.use(cors({ origin: ['https://prf-2021-frontend.herokuapp.com', 'http://localhost:4200'] }));
app.use(cookieParser({ secret: process.env.APP_SECRET}));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(express.json({ limit: '50mb' }));
app.use(expressSession({ secret: process.env.APP_SECRET, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passportConfig.initPassport(passport);

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    }
    next();
});

app.use('/auth', require('./routes/auth.route'));
app.use('/product', require('./routes/product.route'));
app.use('/order', require('./routes/order.route'));
app.use('/user', require('./routes/user.route'));

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});