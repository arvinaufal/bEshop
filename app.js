'use strict';

const express = require('express');
const session = require('express-session');
const { Session } = require('express-session');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'rMt-42.T34aM6-b3SH0p',
    resave: false,
    saveUninitialized: false,
    cookie : {
        secure : false,
        sameSite: true
    }
}));
app.use(require('./routes'));


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});