const mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
const Schema = mongoose.Schema;



var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    dateCreated: Date,
    email: String,
    password: String,
    leagues: [{ type: Schema.Types.ObjectId, ref: 'League'}]
});

module.exports = mongoose.model('Player', PlayerSchema);