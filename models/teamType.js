const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamTypeSchema = new Schema({
    name: String,
    isDisplay: boolean
});

module.exports = mongoose.model('TeamType', TeamTypeSchema);