const mongoose = require('mongoose');

var addresSchema = new mongoose.Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    postal_code: { type: String, required: true }
});

var orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
});

var orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Types.ObjectId, required: true },
    address: addresSchema,
    orders: [ orderItemSchema ],
    status: { type: String }
}, { collection: 'orders' });

orderSchema.pre('save', function(next) {
    const order = this;
    order.status = 'pending';
    return next();
});

mongoose.model('order', orderSchema);