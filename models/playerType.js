const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlayerTypeSchema = new Schema({
    name: String
});

PlayerTypeSchema.set('collection', 'playerTypes');

module.exports = mongoose.model('PlayerType', PlayerTypeSchema);
