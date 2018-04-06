const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    dateCreated: Date,
    email: {type: String, required:true, index: { unique: true }},
    password: String,
    roles: String
});

module.exports = mongoose.model('Player', PlayerSchema);