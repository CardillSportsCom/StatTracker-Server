const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var LogSchema = new Schema({
    dateCreated: Date,
    data: Object,
    type: String

});

module.exports = mongoose.model('Log', LogSchema);
