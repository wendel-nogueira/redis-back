import { Messages } from '../models/Messages';
import { IMessage } from '../interfaces/IMessage';



class MessageController {
    async handle(message: IMessage) {
        if (!message.message || message.message === '' || message.message === ' ') {
            throw new Error('Mensagem inválida');
        }

        console.log('received message:');
        console.log(message);

        if (message.type === 'get') {
            return await this.getMessageResponse(message.message);
        } else if (message.type === 'post') {
            if (!message.response || message.response === '' || message.response === ' ') {
                throw new Error('Resposta inválida');
            }

            return await this.addMessageResponse(message.message, message.response);
        }

        throw new Error('Tipo não suportado');
    }

    async getMessageResponse(message: string) {
        const response = await Messages.findAll({
            where: {
                message: message
            }
        });

        if (response.length > 0) {
            const random = Math.floor(Math.random() * response.length);

            return {
                message: message,
                response: response[random].response
            };
        } else {
            throw new Error('Mensagem não encontrada');
        }
    }

    async addMessageResponse(message: string, response: string) {
        const newResponse = await Messages.create({
            message: message,
            response: response
        });

        return JSON.stringify(newResponse);
    }
}

export { MessageController };