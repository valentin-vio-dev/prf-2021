const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    interface: { type: String },
    chipset: { type: String, required: true },
    memory_size: { type: Number },
    price: { type: Number },
    avaible: { type: Boolean, required: true },
    description: { type: String },
    image: { type: String }
}, { collection: 'products' });

mongoose.model('product', productSchema);