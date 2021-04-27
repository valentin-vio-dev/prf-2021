const errorResponse = require('../utils/error.handler');
const successResponse = require('../utils/success.handler');

const mongoose = require('mongoose');
const Order = mongoose.model('order');

const reqContains = require('../utils/req-contains')
const createModelObj = require('../utils/create-model-obj')

module.exports.getAll = function(req, res, next) {
    Order.find((error, orders) => {
        if(error) return res.status(500).send(errorResponse(error));
        return res.status(200).send(successResponse('', { orders: orders }));
    });
}

module.exports.getAllByCustomer = function(req, res, next) {
    if (req.query.id) {
        Order.find({ customerId: req.query.id }, (error, orders) => {
            if(error) return res.status(500).send(errorResponse(error));
            return res.status(200).send(successResponse('', { orders: orders }));
        });
    } else {
        return res.status(400).send(errorResponse('ID is missing!'));
    }
}

module.exports.getById = function(req, res, next) {
    if (req.query.id) {
        Order.findOne({ _id: req.query.id }, (error, order) => {
            if(!order) return res.status(404).send(errorResponse('No order found!'));
            if(error) return res.status(500).send(errorResponse(error));
            return res.status(200).send(successResponse('', { order: order }));
        });
    } else {
        return res.status(400).send(errorResponse('ID is missing!'));
    }
}

module.exports.order = function(req, res, next) {
    let fields = ['customerId', 'address', 'orders', 'added'];
    if (reqContains(req, fields)) {
        if (req.body.orders.length < 1) {
            return res.status(400).send(errorResponse('No order item added!'));
        } else {
            let obj = createModelObj(req, fields);
            let newOrder = new Order(obj);
            newOrder.save(error => {
                if(error) return res.status(500).send(errorResponse(error));
                return res.status(200).send(successResponse('The order has been saved', {}));
            });
        }
    } else {
        return res.status(400).send(errorResponse('Some fields are missing!'));
    }
}

module.exports.updateStatus = function(req, res, next) {
    if (req.body.id && req.body.status) {
        Order.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, null, (error, order) => {
            if (error) return res.status(500).send(errorResponse(error));
            if(!order) return res.status(404).send(errorResponse('No order found!'));
            return res.status(200).send(successResponse('Order status updated', { status: req.body.status }));
        });
    } else {
        return res.status(400).send(errorResponse('Some fields are missing!'));
    }
}
