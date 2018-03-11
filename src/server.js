import Hapi from 'hapi';

const routes = require('./routes');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
// const HapiMongoose = require('hapi-mongoose');
const db = require('./database').db;

(async () => {
    var port = parseInt(process.env.PORT) || 3000;
    const server = new Hapi.Server({port: port});
    server.port = port;
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                'version': Pack.version,
            },
        // host:'api-cardillsports-st.herokuapp.com'
        
    };
    const mongoOptions = {
        promises: 'native',
        uri: 'mongodb://csstattracker:Mr1aB-09d3U-@den1.mongo1.gear.host:27001/csstattracker'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
        // {
        //     plugin: HapiMongoose,
        //     options: mongoOptions
        // }
    ]);
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    server.route(routes);
})();