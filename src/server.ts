import { createClient } from 'redis';
import { OperationsController } from './operationsController';


const redisClient = createClient({
    host: '127.0.0.1',
    port: 6379
});

const channels = {
    message: 'message',
    archive: 'archive',
    function: 'function'
};

(async () => {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    const operationsController = new OperationsController();


    await subscriber.subscribe(channels.message, (message) => {
        operationsController.messageOperation(message).then((response) => {
            const publisher = redisClient.duplicate();
            
            publisher.connect();

            publisher.publish(channels.message + '-response', JSON.stringify({
                result: response
            }));
        });
    }).then(() => {
        console.log(`subscribed to ${channels.message}`);
    });
    
    await subscriber.subscribe(channels.archive, (message) => {
        operationsController.archiveOperation(message).then((response) => {
            const publisher = redisClient.duplicate();
            
            publisher.connect();

            publisher.publish(channels.archive + '-response', JSON.stringify({
                result: response
            }));
        });
    }).then(() => {
        console.log(`subscribed to ${channels.archive}`);
    });

    await subscriber.subscribe(channels.function, (message) => {
        operationsController.countOperation(message).then((response) => {
            const publisher = redisClient.duplicate();
            
            publisher.connect();

            publisher.publish(channels.function + '-response', JSON.stringify({
                result: response
            }));
        });
    }).then(() => {
        console.log(`subscribed to ${channels.function}`);
    });
})();


export default redisClient;