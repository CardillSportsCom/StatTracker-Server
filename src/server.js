const Hapi = require('@hapi/hapi');

const routes = require('./routes');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
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
            // Uncomment this to do local development
            // host: 'localhost',
            routes:
                {
                    cors: {
                        origin: ["*"],
                        headers: ["Accept", "Content-Type", "Authorization"],
                        additionalHeaders: ["X-Requested-With"]
                    }
                    // },
                    // validate: {
                    //     failAction: async (request, h, err) => {
                    //         // During development, log and respond with the full error.
                    //         console.error(err);
                    //         throw err;
                    //     }
                    //   }
                }
        }
    );
    server.port = port;
    const swaggerOptions = {
        grouping: 'tags',
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
            // Comment this out for local development
            // Not specifying the host will default to localhost

            // host:'test-cardillsports-stattracker.herokuapp.com'
            host:'api-cardillsports-st.herokuapp.com'
    };
    const mongoOptions = {
        promises: 'native',
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
    // server.auth.default('jwt');

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

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://stat-tracker-1537117819639.firebaseio.com/'
    });

})();
