'use strict';

const express = require('express');
const SellerController = require('../../controllers/SellerController');
const router = express.Router();

// * sellers
router.get('/:sellerId');
router.get('/:sellerId/products', SellerController.getProducts);
router.get('/:sellerId/products/add', SellerController.getAddProduct);
router.get('/:sellerId/products/:productId/edit', SellerController.getEditProduct);
router.get('/:sellerId/products/:productId/delete', SellerController.deleteProduct);

router.post('/:sellerId/products/add', SellerController.addProduct);
router.post('/:sellerId/products/:productId/edit', SellerController.editProduct);

module.exports = router;