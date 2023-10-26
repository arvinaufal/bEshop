'use strict';

const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const { checkLoginStatus, checkProfile } = require('../middlewares');
const LandingPageController = require('../controllers/LandingPageController');
const router = express.Router();

// * auth

router.get('/', checkLoginStatus, checkProfile, LandingPageController.landingPage); //Landing page
router.use('/auth', require('./auth'));

router.get('/profile'); // display profile (opt)
router.get('/profile/edit', checkLoginStatus, checkProfile, UserController.formProfile); 

router.post('/profile/edit'); // post

// * buyer
router.use('/products', require('./products'));

// * seller
router.use('/sellers', require('./sellers'));

module.exports = router;