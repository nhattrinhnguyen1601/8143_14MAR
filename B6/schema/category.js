let mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    isdeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
module.exports = mongoose.model('Category', categorySchema);