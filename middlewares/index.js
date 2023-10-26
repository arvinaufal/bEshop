'use strict';

const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const router = express.Router();

// * auth
function checkLoginStatus(req, res, next) {

    if (!req.session.userId) {

        //login ke LP
        // if (req.session.role === "buyer") {
            
        //     next();
        // } else {
            
            const error = 'Please login first!';
            res.redirect(`/auth/login?errors=${error}`);
        // }
    } else {
        if (!req.session.role) {
            
            const error = 'Invalid role!';
            res.redirect(`/auth/login?errors=${error}`);
        } else {
            
            //login ke cms
            if (req.session.role === "seller" || req.session.role === "buyer") {
                
                next();
            } else {
                
                const error = `Invalid role!`;
                res.redirect(`/auth/login?errors=${error}`);
            }
        }
    }
}

function checkProfile(req, res, next) {
    if (req.session.profileEmptyField) {

        const error = 'Please fill your profile!';
        res.redirect(`/profile/edit?errors=${error}`);
    } else {
       next();
    }
}


module.exports = {checkLoginStatus, checkProfile}