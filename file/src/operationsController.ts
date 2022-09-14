import { Logs } from './models/Logs';
import { Messages } from './models/Messages';
import { readFile, writeFile, appendFileSync } from 'fs';



class OperationsController {
    //  { "type": "get", "message": "a" }
    //  { "type": "set", "message": "a", "response": "b" }
    async messageOperation(message: string) {
        const messageObject = JSON.parse(message);

        if (!messageObject.type || messageObject.type !== 'get' && messageObject.type !== 'set') {
            return 'Tipo inválido!';
        }

        if (!messageObject.message) {
            return 'Mensagem inválida!';
        }

        await Logs.create({
            operation: 'messageOperation',
            date: new Date()
        });

        if (messageObject.type === 'get') {
            const response = await Messages.findAll({
                where: {
                    message: messageObject.message
                }
            });

            if (response.length > 0) {
                return JSON.stringify(response[Math.floor(Math.random() * response.length)]);
            } else {
                return 'Mensagem não encontrada!';
            }
        } else if (messageObject.type === 'set') {
            if (!messageObject.response) {
                return 'Resposta inválida!';
            }

            const response = await Messages.create({
                message: messageObject.message,
                response: messageObject.response
            });

            return JSON.stringify(response);
        }
    }

    //  { "type": "add", "text": "a" }
    //  { "type": "remove", "text": "a" }
    async archiveOperation(message: string) {
        const messageObject = JSON.parse(message);

        if (!messageObject.type || messageObject.type !== 'add' && messageObject.type !== 'remove') {
            return 'Tipo inválido!';
        }

        if (!messageObject.text) {
            return 'Texto inválido!';
        }

        await Logs.create({
            operation: 'archiveOperation',
            date: new Date()
        });

        if (messageObject.type === 'add') {
            let fileContent = await readFile('file.txt', 'utf8', (err, data) => {
                if (err) {
                    return 'Erro ao ler arquivo!';
                }

                return data;
            });

            if (fileContent == undefined) {
                fileContent = '';
            }

            await appendFileSync('file.txt', `${fileContent}\n${messageObject.text}`);

            return 'Texto adicionado com sucesso!';
        } else if (messageObject.type === 'remove') {
            let fileContent = await readFile('file.txt', 'utf8', (err, data) => {
                if (err) {
                    return 'Erro ao ler arquivo!';
                }

                return data;
            });

            if (fileContent == undefined) {
                fileContent = '';
            }

            await writeFile('file.txt', fileContent.replace(messageObject.text, ''), (err) => {
                if (err) {
                    return 'Erro ao escrever no arquivo!';
                }
            });

            return 'Texto removido com sucesso!';
        }
    }

    //  { "operation": "1+1" }
    async countOperation(message: string) {
        const messageObject = JSON.parse(message);

        if (!messageObject.operation || messageObject.operation === '') {
            return 'Operação inválida!';
        }

        await Logs.create({
            operation: 'countOperation',
            date: new Date()
        });

        try {
            return eval(messageObject.operation);
        } catch (error) {
            return 'Operação inválida!';
        }
    }
}

export { OperationsController };