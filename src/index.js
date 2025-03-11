import { initMongoConnection } from './db/initMongoConnection.js'
import { SetupServer } from './server.js'

const bootstrap = async() => {
    await initMongoConnection();
    SetupServer();
};

bootstrap();
