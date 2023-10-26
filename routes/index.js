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
router.use('/profile', require('./profile'));

// /profile/edit/
// * buyer
router.get('/products');
router.get('/products/:productId/detail');
router.post('/products/:productId/chart'); // post
router.post('/products/:productId/shipment'); // post
router.get('/products/chart');
router.get('/products/shipment');
router.get('/products/payment');
router.get('/products/payment/confirmation');
router.post('/products/payment/confirmation'); // post

// * seller
router.use('/sellers', require('./sellers'));

module.exports = router;