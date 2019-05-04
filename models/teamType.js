const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamTypeSchema = new Schema({
    name: String,
    isDisplay: Boolean
});

TeamTypeSchema.set('collection', 'teamTypes');

module.exports = mongoose.model('TeamType', TeamTypeSchema);