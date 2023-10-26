'use strict';

const express = require('express');
const PaymentController = require('../../controllers/PaymentController');
const router = express.Router();

// * products
router.get('');
router.get('/:productId/detail');
router.post('/:productId/cart'); // post
router.get('/cart');
router.get('/:paymentId/payment', PaymentController.getPayment);
router.post('/:paymentId/payment', PaymentController.updatePayment); // post
router.get('/:paymentId/payment/confirmation', PaymentController.getConfirmation);
router.get('/:paymentId/payment/invoice', PaymentController.downloadInvoice); // post

module.exports = router;