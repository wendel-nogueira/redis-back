import { Logs } from '../models/Logs';
import { FunctionController } from './functionController';



class OperationController {
    async execute(message: string, channel: string) {
        const messageObject = JSON.parse(message);
        const functionController = new FunctionController();

        await this.saveLog(message, channel);

        return await functionController.handle(messageObject);
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