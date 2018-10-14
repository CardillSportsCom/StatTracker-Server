var Mongoose = require('mongoose');
//load database
// Mongoose.connect('mongodb://csstattracker:Mr1aB-09d3U-@den1.mongo1.gear.host:27001/csstattracker');
Mongoose.connect('mongodb://testcstattracker:Yf70c43-w48-@den1.mongo1.gear.host:27001/testcstattracker');

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;