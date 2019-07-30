var Mongoose = require('mongoose');

var clusterName = 'mongodb+srv://cardill-sports:Cardillsports@cardill-sports-qg6aw.mongodb.net/'
Mongoose.connect(clusterName, {dbName: 'testcsstattracker'});
// Mongoose.connect(clusterName, {dbName: 'csstattracker'});

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;
