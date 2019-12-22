const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    category: { type: mongoose.Types.ObjectId, ref: 'categories' },
    name: { type: String, required: true },
    amount: { type: Number, required: true, index: true },
    isDeleted: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() }
}, { timestamps: true }
);

itemSchema.index({ category: 1, isDeleted: 1, });
module.exports = mongoose.model('items', itemSchema);