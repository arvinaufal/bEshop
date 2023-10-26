'use strict';

const express = require('express');
const SellerController = require('../../controllers/SellerController');
const { checkLoginStatus, checkProfile } = require('../../middlewares');
const router = express.Router();

// * sellers
router.get('/:sellerId');
router.get('/:sellerId/products', checkLoginStatus, SellerController.getProducts);
router.get('/:sellerId/products/add', checkLoginStatus, checkProfile, SellerController.getAddProduct);
router.get('/:sellerId/products/:productId/edit', checkLoginStatus, checkProfile, SellerController.getEditProduct);
router.get('/:sellerId/products/:productId/delete', checkLoginStatus, checkProfile, SellerController.deleteProduct);

router.post('/:sellerId/products/add', checkLoginStatus, checkProfile, SellerController.addProduct);
router.post('/:sellerId/products/:productId/edit', checkLoginStatus, checkProfile, SellerController.editProduct);

module.exports = router;