const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/registrate', authController.registrate);
router.post('/logout', authController.logout);

module.exports = router;