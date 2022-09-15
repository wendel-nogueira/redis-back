import { Logs } from '../models/Logs';
import { FileController } from './fileController';



class OperationController {
    async execute(message: string, channel: string, filePath: string) {
        const messageObject = JSON.parse(message);
        const fileController = new FileController();

        await this.saveLog(message, channel);

        return await fileController.handle(messageObject, filePath);
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