const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const positionSchema = Schema({
    name: String,
}, { versionKey: false });

positionSchema.virtual('url').get(function() {
    return `/positions/${this._id}`;
})

module.exports = mongoose.model('Position', positionSchema);