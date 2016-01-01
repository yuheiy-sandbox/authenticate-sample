'use strict';
const path = require('path');
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes/index');

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserialize');
  done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
  const ADMIN_USERNAME = 'user';
  const ADMIN_PASSWORD = 'pass';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    console.log('success');
    return done(null, username);
  }

  console.log('fail');
  return done(null, false);
}));

const app = express();
// const MongoStore = require('connect-mongo')(session);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // store: new MongoStore({ url: process.env.MONGOLAB_URI })
}));
app.use(require('connect-flash')());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
