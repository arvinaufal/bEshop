'use strict';

const express = require('express');
const PaymentController = require('../../controllers/PaymentController');
const CartController = require('../../controllers/CartController');
const router = express.Router();

// * products
router.get('');
router.get('/:productId/detail');
router.post('/:productId/cart'); // post

router.post('/buy', CartController.createCart);
router.post('/cart', CartController.createCart);
router.get('/cart/user/:userId', CartController.cartMenu);
router.get('/cart/:userId/total/:orderId/increment', CartController.changeTotal);
router.get('/cart/:userId/total/:orderId/decrement', CartController.changeTotal);

router.post('/payment', PaymentController.toPayment);
router.get('/:paymentId/payment', PaymentController.getPayment);
router.post('/:paymentId/payment', PaymentController.updatePayment); // post
router.get('/:paymentId/payment/confirmation', PaymentController.getConfirmation);
router.get('/:paymentId/payment/invoice', PaymentController.downloadInvoice); // post


module.exports = router;