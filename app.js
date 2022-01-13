const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const clubsRouter = require('./routes/clubs');
const countriesRouter = require('./routes/countries');
const playersRouter = require('./routes/players');
const positionsRouter = require('./routes/positions');
const apiRouter = require('./routes/api');
const testRouter = require('./routes/test');

const lib = require('./lib/main');

const app = express();

const mongoDB = "mongodb://127.0.0.1/soccer_players_db";
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const hbs = exphbs.create({
    defaultLayout: "layout",
    helpers: lib.helpers,
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials/'),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clubs', clubsRouter);
app.use('/countries', countriesRouter);
app.use('/players', playersRouter);
app.use('/positions', positionsRouter);
app.use('/api', apiRouter);
app.use('/test', testRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;