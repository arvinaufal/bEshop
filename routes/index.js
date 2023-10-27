'use strict';

const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const { checkLoginStatus, checkProfile, isBuyer } = require('../middlewares');
const LandingPageController = require('../controllers/LandingPageController');
const router = express.Router();

// * auth

router.get('/', checkLoginStatus, checkProfile, isBuyer, LandingPageController.landingPage); //Landing page
router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));

// /profile/edit/
// * buyer
router.use('/products', require('./products'));

// * seller
router.use('/sellers', require('./sellers'));

module.exports = router;