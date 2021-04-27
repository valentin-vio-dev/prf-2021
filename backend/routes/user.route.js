const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.put('/', userController.updateUser);
router.get('/user', userController.getById);
router.put('/update/access', userController.updateAccessLevel);
router.post('/', userController.addUser);

module.exports = router;