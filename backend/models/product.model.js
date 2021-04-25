const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    interface: { type: String },
    chipset: { type: String, required: true },
    chipset_family: { type: String },
    chip_speed: { type: Number },
    cooler_type: { type: String },
    memory_size: { type: Number },
    memory_type: { type: String },
    memory_speed: { type: Number },
    fans_num: { type: Number },
    color: { type: String },
    price: { type: Number },
    avaible: { type: Boolean, required: true },
    description: { type: String },
    image: { type: String }
}, { collection: 'products' });

mongoose.model('product', productSchema);