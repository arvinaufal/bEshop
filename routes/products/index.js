'use strict';

const express = require('express');
const PaymentController = require('../../controllers/PaymentController');
const router = express.Router();

// * products
router.get('');
router.get('/:productId/detail');
router.post('/:productId/cart'); // post
router.get('/cart');
router.get('/payment', PaymentController.getPayment);
router.post('/payment'); // post
router.get('/payment/confirmation');
router.post('/payment/confirmation'); // post

module.exports = router;