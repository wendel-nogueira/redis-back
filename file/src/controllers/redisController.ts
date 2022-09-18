import { createClient } from 'redis';
import { OperationController } from './operationController';
import { IConnection } from '../interfaces/IConnection';



class RedisController {
    private redisClient: any;
    private channel: string;
    private operationController: any;


    constructor(connection: IConnection, channel: string) {
        this.redisClient = createClient(connection);

        this.channel = channel;
        this.operationController = new OperationController();
    }

    public async execute(responseChannel: string, filePath: string) {
        const subscriber = this.redisClient.duplicate();
        const publisher = this.redisClient.duplicate();

        await subscriber.connect();
        await publisher.connect();

        await subscriber.subscribe(this.channel, (message: string, channel: string, response: string) => {
            this.operationController.execute(message, channel, filePath).then((response: string) => {
                publisher.publish(responseChannel, JSON.stringify({
                    'type': 'sucess',
                    'channel': this.channel,
                    'result': response
                }));
            }).catch((error: any) => {
                publisher.publish(responseChannel, JSON.stringify({
                    'type': 'error',
                    'channel': this.channel,
                    'result': error.message
                }));
            });
        }).then(() => {
            console.log(`subscribed to ${this.channel}`);
        }).catch((error: any) => {
            console.log(`error subscribing to ${this.channel}: ${error.message}`);
        });
    }
}

export { RedisController };