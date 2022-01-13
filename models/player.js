const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = Schema({
    firstName: { type: String, required: true, maxLength: 20, trim: true },
    secondtName: { type: String, required: true, maxLength: 20, trim: true },
    footballClub: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    position: { type: Schema.Types.ObjectId, ref: 'Position', required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    birthYear: { type: Number, required: true, trim: true }
}, { versionKey: false });

playerSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.secondtName}`;
})

playerSchema.virtual('url').get(function() {
    return `/players/${this._id}`;
})

module.exports = mongoose.model('Player', playerSchema);