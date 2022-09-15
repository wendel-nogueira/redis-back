import { config } from 'dotenv';
import { resolve } from 'path';
import { RedisController } from './controllers/redisController';
import { IConnection } from './interfaces/IConnection';
import express from 'express';
import cors from 'cors';



config({ path: resolve(__dirname, '../../.env') });

const connection: IConnection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379')
};

const channel = process.env.REDIS_FILE_CHANNEL || 'file';
const responseChannel = process.env.REDIS_RESPONSE_CHANNEL || 'response';
const redisController = new RedisController(connection, channel);

const app = express();
const port = process.env.EXPRESS_PORT || 3000;
const filePath = __dirname + '/' + process.env.PUBLIC_FOLDER + '/' + process.env.FILE_NAME || __dirname + '/public/file.txt';

app.use(cors());
app.use(express.static(__dirname + '/' + process.env.PUBLIC_FOLDER || __dirname + '/public'));


redisController.execute(responseChannel, filePath).then(() => {
    console.log('connected');
}).catch((error: any) => {
    console.log(error.message);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
