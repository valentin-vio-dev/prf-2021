const errorResponse = require('../utils/error.handler');
const successResponse = require('../utils/success.handler');

const mongoose = require('mongoose');
const Product = mongoose.model('product');

const reqContains = require('../utils/req-contains')
const createModelObj = require('../utils/create-model-obj')

module.exports.add = function(req, res, next) {
    let fields = ['name', 'manufacturer', 'chipset', 'avaible'];
    if (reqContains(req, fields)) {
        Product.findOne({ name: req.body.name }, (err, product) => {
            if (err) return res.status(500).send(errorResponse(err));
            if (product) return res.status(400).send(errorResponse('Product already exists!'));

            let newProduct = new Product(createModelObj(req, fields));
            newProduct.save((error) => {
                if(error) return res.status(500).send(errorResponse(error));
                return res.status(200).send(successResponse('Product added', { product: newProduct }));
            });
        });
    } else {
        return res.status(400).send(errorResponse('Some fields are missing!'));
    }
}

module.exports.delete = function(req, res, next) {
    if (req.body._id) {
        Product.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, (err, product) => {
            if (err) return res.status(500).send(errorResponse(err));
            if (!product) return res.status(404).send(errorResponse('Product not found!'));

            Product.deleteOne({ _id: mongoose.Types.ObjectId(req.body._id) }, null, (err) => {
                if (err) return res.status(500).send(errorResponse(err));
                return res.status(200).send(successResponse('Product deleted!', { _id: req.body._id }));
            });
        });
    } else {
        return res.status(400).send(errorResponse('ID is missing!'));
    }
}

module.exports.update = function(req, res, next) {
    if (req.body._id) {
        let props = [];
        Object.keys(req.body).forEach(key => {
            props.push(key);
        });

        if (props.length > 1) {
            let obj = createModelObj(req, props);
            delete obj._id;
            Product.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, (err, product) => {
                if (err) return res.status(500).send(errorResponse(err));
                if (!product) return res.status(404).send(errorResponse('Product not found!'));
    
                Product.updateOne({ _id: mongoose.Types.ObjectId(req.body._id) }, obj, null, (err, ress) => {
                    if (err) return res.status(500).send(errorResponse(err));
                    return res.status(200).send(successResponse('Product updated!', {}));
                });
            });
        } else {
            return res.status(400).send(errorResponse('No update data provided!'));
        }
    } else {
        return res.status(400).send(errorResponse('ID is missing!'));
    }
}

module.exports.getAll = function(req, res, next) {
    Product.find((err, products) => {
        if (err) return res.status(500).send(errorResponse(err));
        return res.status(200).send(successResponse('', { products: products}));
    });
}

module.exports.getFiltered = function(req, res, next) {
    let props = [];
    Object.keys(req.query).forEach(key => {
        props.push(key);
    });

    if (props.length > 0) {
        let obj = createModelObj(req, props, true);
        Product.find(obj, (err, products) => {
            if (err) return res.status(500).send(errorResponse(err));
            return res.status(200).send(successResponse('', { products: products}));
        });
    } else {
        return res.status(400).send(errorResponse('No filter data provided!'));
    }
}

module.exports.getById = function(req, res, next) {
    if (req.body._id) {
        Product.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, (err, product) => {
            if (err) return res.status(500).send(errorResponse(err));
            if (!product) return res.status(404).send(errorResponse('Product not found!'));

            return res.status(200).send(successResponse('', { product: product }));
        });
    } else {
        return res.status(400).send(errorResponse('No ID provided!'));
    }
}