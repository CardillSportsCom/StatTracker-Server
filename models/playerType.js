const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlayerTypeSchema = new Schema({
    name: String
});


module.exports = mongoose.model('PlayerType', PlayerTypeSchema);
