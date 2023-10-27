'use strict';

const express = require('express');
const SellerController = require('../../controllers/SellerController');
const { checkLoginStatus, checkProfile, isSeller } = require('../../middlewares');
const router = express.Router();

// * sellers
// router.get('/:sellerId');
router.get('/:sellerId/products', checkLoginStatus, isSeller, SellerController.getProducts);
router.get('/:sellerId/products/add', checkLoginStatus, checkProfile, isSeller, SellerController.getAddProduct);
router.get('/:sellerId/products/:productId/edit', checkLoginStatus, checkProfile, isSeller, SellerController.getEditProduct);
router.get('/:sellerId/products/:productId/delete', checkLoginStatus, checkProfile, isSeller, SellerController.deleteProduct);

router.post('/:sellerId/products/add', checkLoginStatus, checkProfile, isSeller, SellerController.addProduct);
router.post('/:sellerId/products/:productId/edit', checkLoginStatus, checkProfile, isSeller, SellerController.editProduct);

module.exports = router;