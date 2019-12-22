const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    userId: { type: String, required: true, index: true },
    amount: { type: Number },
}, { timestaps: true });

settingSchema.index({ isDeleted: 1 });

module.exports = mongoose.model('settings', settingSchema);