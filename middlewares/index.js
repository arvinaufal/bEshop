'use strict';

const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const router = express.Router();

// * auth
function checkLoginStatus(req, res, next) {
    if (!req.session.userId) {

        const error = 'Please login first!';
        res.redirect(`/auth/login?errors=${error}`);
    } else {
        if (!req.session.role) {
            
            const error = 'Invalid role!';
            res.redirect(`/auth/login?errors=${error}`);
        } else {
            
            if (req.session.role === "seller" || req.session.role === "buyer") {
                
                req.params.id = req.session.userId;
                next();
            } else {
                
                const error = `Invalid role!`;
                res.redirect(`/auth/login?errors=${error}`);
            }
        }
    }
}

function checkProfile(req, res, next) {
    if (req.session.profileEmpty) {

        const error = 'Please fill your profile!';
        res.redirect(`/profile/add/${req.params.id}?errors=${error}`);
    } else {
       next();
    }
}


function isBuyer(req, res, next) {
    if (req.session. role !== "buyer") {

        const error = `You're not allowed!`;
        res.redirect(`/auth/login?errors=${error}`);
    }
    next();
}


function isSeller(req, res, next) {
    if (req.session. role !== "seller") {

        const error = `You're not allowed!`;
        res.redirect(`/auth/login?errors=${error}`);
    }
    next();
}


module.exports = {checkLoginStatus, checkProfile, isSeller, isBuyer}