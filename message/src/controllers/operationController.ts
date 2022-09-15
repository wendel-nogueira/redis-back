import { Logs } from '../models/Logs';
import { MessageController } from './messageController';



class OperationController {
    async execute(message: string, channel: string) {
        const messageObject = JSON.parse(message);
        const messageController = new MessageController();

        await this.saveLog(message, channel);

        return await messageController.handle(messageObject);
    }

    async saveLog(message: string, channel: string) {
        await Logs.create({
            channel: channel,
            info: message,
            date: new Date()
        });
    }
}

export { OperationController };