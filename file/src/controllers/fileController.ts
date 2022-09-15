import { appendFile } from 'fs';



class FileController {
    async handle({ text }, filePath: string) {
        if (!text || text === '' || text === ' ') {
            throw new Error('Texto inválido');
        }

        console.log('received message:');
        console.log(text);

        try {
            await appendFile(filePath, text, (error) => {
                if (error) {
                    throw new Error('Erro ao escrever no arquivo');
                }
            });

            return 'Arquivo salvo com sucesso';
        } catch (error) {
            throw new Error('Erro ao escrever no arquivo');
        }
    }
}

export { FileController };