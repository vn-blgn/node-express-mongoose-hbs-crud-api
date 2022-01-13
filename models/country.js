const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = Schema({
    name: String,
}, { versionKey: false });

countrySchema.virtual('url').get(function() {
    return `/countries/${this._id}`;
})

module.exports = mongoose.model('Country', countrySchema);