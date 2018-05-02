const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamTypeSchema = new Schema({
    name: String,
    isDisplay: Boolean
});

module.exports = mongoose.model('TeamType', TeamTypeSchema);