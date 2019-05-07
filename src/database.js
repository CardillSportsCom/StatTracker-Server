var Mongoose = require('mongoose');
//load database
// Mongoose.connect('mongodb://desktop-osq5g16:3000/hapijs-mongoose-restapi');

// Mongoose.connect('mongodb://csstattracker:Mr1aB-09d3U-@den1.mongo1.gear.host:27001/csstattracker');
// Mongoose.connect('mongodb://testcstattracker:Yf70c43-w48-@den1.mongo1.gear.host:27001/testcstattracker');
Mongoose.connect('mongodb+srv://cardill-sports:Cardillsports@cardill-sports-qg6aw.mongodb.net/', {dbName: 'testcsstattracker'});
// Mongoose.connect('mongodb+srv://cardill-sports:Cardillsports@cardill-sports-qg6aw.mongodb.net/', {dbName: 'csstattracker'});


var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://cardill-sports:Cardillsports@cardill-sports-qg6aw.mongodb.net/testcsstattracker";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//  // perform actions on the collection object
//     console.log('Connection with database succeeded.');

//   client.close();
// });

// exports.db = client;