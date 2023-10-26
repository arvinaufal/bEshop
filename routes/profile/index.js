'use strict';

const express = require('express');
const UserController = require('../../controllers/UserController');
const { checkLoginStatus, checkProfile } = require('../../middlewares');

const router = express.Router();

router.get(''); // display profile (opt)
router.get('/add/:id', checkLoginStatus, UserController.formProfileAdd); 
router.post('/add/:id', UserController.addProfile); // post
router.get('/edit/:id', checkLoginStatus, UserController.formProfileEdit); 
router.post('/edit/:id', UserController.editProfile); // post


module.exports = router;