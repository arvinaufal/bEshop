'use strict';

const express = require('express');
const router = express.Router();

// * auth
router.get('/');
router.get('/register');
router.post('/register'); // post
router.get('/login/user');
router.post('/login/user'); // post
router.get('/login/seller');
router.post('/login/seller'); // post
router.get('/profile'); // display profile (opt)
router.get('/profile/edit'); 
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