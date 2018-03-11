const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");


var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    dateCreated: Date,
    email: String,
    password: String,
    leagues: [{ type: Schema.Types.ObjectId, ref: 'League', childPath:'players' }]
});

PlayerSchema.plugin(relationship, {
    relationshipPathName: 'leagues'
});
module.exports = mongoose.model('Player', PlayerSchema);