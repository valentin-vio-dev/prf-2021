const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getAll);
router.get('/customer', orderController.getAllByCustomer);
router.get('/order', orderController.getById);
router.post('/', orderController.order);
router.put('/status', orderController.updateStatus);

module.exports = router;