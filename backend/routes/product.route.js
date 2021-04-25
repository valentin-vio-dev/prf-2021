const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getAll);
router.get('/id', productController.getById);
router.get('/filter', productController.getFiltered);
router.delete('/', productController.delete);
router.put('/', productController.update);
router.post('/', productController.add);

module.exports = router;