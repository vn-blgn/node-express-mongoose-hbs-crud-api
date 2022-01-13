const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = Schema({
    name: String,
}, { versionKey: false });

clubSchema.virtual('url').get(function() {
    return `/clubs/${this._id}`;
})

module.exports = mongoose.model('Club', clubSchema);