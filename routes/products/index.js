'use strict';

const express = require('express');
const PaymentController = require('../../controllers/PaymentController');
const CartController = require('../../controllers/CartController');
const { checkLoginStatus, checkProfile, isBuyer } = require('../../middlewares');
const LandingPageController = require('../../controllers/LandingPageController');
const router = express.Router();

// * products
router.get('', checkLoginStatus, checkProfile, isBuyer, LandingPageController.landingPage);
router.get('/:productId/detail', checkLoginStatus, checkProfile, isBuyer, LandingPageController.landingPage);
router.post('/:productId/cart', checkLoginStatus, checkProfile, isBuyer, LandingPageController.landingPage); // post

router.post('/buy', checkLoginStatus, isBuyer, CartController.createCart);
router.post('/cart', checkLoginStatus, checkProfile, isBuyer, CartController.createCart);
router.get('/cart/user/:userId', checkLoginStatus, checkProfile, isBuyer, CartController.cartMenu);
router.get('/cart/:userId/total/:orderId/increment', checkLoginStatus, checkProfile, isBuyer, CartController.changeTotal);
router.get('/cart/:userId/total/:orderId/decrement', checkLoginStatus, checkProfile, isBuyer, CartController.changeTotal);

router.post('/payment', checkLoginStatus, checkProfile, isBuyer, PaymentController.toPayment);
router.get('/:paymentId/payment', checkLoginStatus, checkProfile, isBuyer, PaymentController.getPayment);
router.post('/:paymentId/payment', checkLoginStatus, checkProfile, isBuyer, PaymentController.updatePayment); // post
router.get('/:paymentId/payment/confirmation', checkLoginStatus, checkProfile, isBuyer, PaymentController.getConfirmation);
router.get('/:paymentId/payment/invoice', checkLoginStatus, checkProfile, isBuyer, PaymentController.downloadInvoice); // post


module.exports = router;