import { Messages } from '../models/Messages';
import { IMessage } from '../interfaces/IMessage';


const defaultMessages: {} = {
    'oi': 'olá',
    'olá': 'oi',
    'opa': 'bao',
    'bao': 'opa',
    'tudo bem?': 'tudo sim e com você?'
};


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
        } 
        
        if (defaultMessages[message]) {
            return {
                message: message,
                response: defaultMessages[message]
            };
        } else {
            throw new Error('Resposta não disponível');
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