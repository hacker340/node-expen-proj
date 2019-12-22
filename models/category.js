const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestaps: true });

catSchema.index({ isDeleted: 1 });

module.exports = mongoose.model('categories', catSchema);