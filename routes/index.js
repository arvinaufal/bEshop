'use strict';

const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const { checkLoginStatus, checkProfile } = require('../middlewares');
const router = express.Router();

// * auth
router.get('/'); //Landing page
router.get('/register', AuthController.registerPage); 
router.post('/register', AuthController.register); // post
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login); // post




router.get('/profile'); // display profile (opt)
router.get('/profile/edit', checkLoginStatus, checkProfile, UserController.formProfile); 
router.post('/profile/edit'); // post

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
router.get('/sellers');
router.get('/sellers/products');
router.get('/sellers/products/add');
router.get('/sellers/products/:productId/edit');
router.get('/sellers/products/:productId/delete');

module.exports = router;