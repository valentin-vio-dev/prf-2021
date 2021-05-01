const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    alcohol: { type: Number, required: true },
    available: { type: Boolean, required: true },
    image: { type: String },
    description: { type: String }
}, { collection: 'products' });

mongoose.model('product', productSchema);