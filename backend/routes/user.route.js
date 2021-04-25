const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/user', userController.getById);
router.put('/update/access', userController.updateAccessLevel);

module.exports = router;