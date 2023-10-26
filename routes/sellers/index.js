'use strict';

const express = require('express');
const SellerController = require('../../controllers/SellerController');
const router = express.Router();

// * sellers
router.get('/:sellerId');
router.get('/:sellerId/products', SellerController.getProducts);
router.get('/:sellerId/products/add', SellerController.getAddProduct);
router.get('/:sellerId/products/:productId/edit');
router.get('/:sellerId/products/:productId/delete');

router.post('/:sellerId/products/add', SellerController.addProduct);
router.post('/:sellerId/products/:productId/edit');

module.exports = router;