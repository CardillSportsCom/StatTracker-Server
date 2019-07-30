var Mongoose = require('mongoose');

Mongoose.connect('mongodb+srv://cardill-sports:Cardillsports@cardill-sports-qg6aw.mongodb.net/', {dbName: 'testcsstattracker'});
// Mongoose.connect('mongodb+srv://cardill-sports:Cardillsports@cardill-sports-qg6aw.mongodb.net/', {dbName: 'csstattracker'});

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;
