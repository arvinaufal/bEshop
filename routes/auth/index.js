'use strict';
const express = require('express');
const AuthController = require('../../controllers/AuthController');
const router = express.Router();


router.get('/register', AuthController.registerPage); 
router.post('/register', AuthController.register); // post
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login); // post
router.get('/logout', AuthController.logout); // get



module.exports = router;