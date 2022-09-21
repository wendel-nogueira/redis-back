import { config } from 'dotenv';
import { resolve } from 'path';
import { RedisController } from './controllers/redisController';
import { IConnection } from './interfaces/IConnection';



config({ path: resolve(__dirname, '../../.env') });

const connection: IConnection = {
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT || '6379')
    },
    password: process.env.REDIS_PASSWORD!,
};

const channel = process.env.REDIS_FUNCTION_CHANNEL || 'function';
const responseChannel = process.env.REDIS_RESPONSE_CHANNEL || 'response';
const redisController = new RedisController(connection, channel);


redisController.execute(responseChannel).then(() => {
    console.log('connected');
}).catch((error: any) => {
    console.log(error.message);
});