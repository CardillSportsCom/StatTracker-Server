import Hapi from 'hapi';

const routes = require('./routes');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Boom = require('boom');
const HapiJWT = require('hapi-auth-jwt2');
const glob = require('glob');
const db = require('./database').db;
const secret = require('./config');
const validate = require('../lib/util/userFunctions').validate;
const validateError = require('../lib/util/userFunctions').validateError;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

(async () => {
    var port = parseInt(process.env.PORT) || 3000;
    const server = new Hapi.Server(
        {
            port: port,
            routes: 
                { 
                    cors: {
                        origin: ["*"],
                        headers: ["Accept", "Content-Type", "Authorization"],
                        additionalHeaders: ["X-Requested-With"]
                    }
                }
        }
    );
    server.port = port;
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                'version': Pack.version,
            },
            securityDefinitions: {
            'jwt': {
                'type': 'apiKey',
                'name': 'Authorization',
                'in': 'header'
            }
            },
            security: [{ 'jwt': [] }],
            // auth: 'jwt',
           host:'test-cardillsports-stattracker.herokuapp.com'
        //    host:'api-cardillsports-st.herokuapp.com'
           
        
    };
    const mongoOptions = {
        promises: 'native',
        // uri: 'mongodb://csstattracker:Mr1aB-09d3U-@den1.mongo1.gear.host:27001/csstattracker'
        uri: 'mongodb://testcsstattracker:Yf70c43-w48-@den1.mongo1.gear.host:27001/testcstattracker'
        // uri: 'mongodb://desktop-osq5g16:3000/hapijs-mongoose-restapi'
        
        
    };

    server.register(HapiJWT);
    server.auth.strategy('jwt', 'jwt', {
        key:secret,
        validate: validate,
        verifyOptions: {
        algorithms: ['HS256'],
        error: validateError
        }
    });
    await server.register([
        Inert,
        Vision,
                
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    // await server.auth.default('jwt');

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    server.route(routes);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://stat-tracker-1537117819639.firebaseio.com/'
    });
  
})();