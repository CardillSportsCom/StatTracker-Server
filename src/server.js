import Hapi from 'hapi';

const routes = require('./routes');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const db = require('./database').db;

(async () => {
    const server = new Hapi.Server({ port: 3000, host: 'localhost' });
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                'version': Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    server.route(routes);
})();