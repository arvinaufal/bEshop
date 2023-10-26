'use strict';

const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const router = express.Router();

// * auth
function checkLoginStatus(req, res, next) {
    console.log(req.session);
    if (!req.session.userId) {

        const error = 'Please login first!';
        res.redirect(`/login?errors=${error}`);
    } else {
        if (!req.session.role) {
            
            const error = 'Invalid role!';
            res.redirect(`/login?errors=${error}`);
        } else {
            
            next();
        }
    }
}

function checkProfile(req, res, next) {
    console.log(req.session);
    if (req.session.profileEmptyField) {

        const error = 'Please fill your profile!';
        res.redirect(`/profile/edit?errors=${error}`);
    } else {
       next();
    }
}


module.exports = {checkLoginStatus, checkProfile}