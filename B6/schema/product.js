let mongoose = require('mongoose');
let productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    imgURL: { type: String, default: '' },
    category: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});
module.exports = mongoose.model('Product', productSchema);