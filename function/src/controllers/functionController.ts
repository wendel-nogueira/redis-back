class FunctionController {
    async handle({ operation }) {
        if (!operation || operation === '' || operation === ' ') {
            throw new Error('Operação inválida');
        }

        console.log('received message:');
        console.log(operation);

        try {
            const result = eval(operation);

            return result;
        } catch (error) {
            throw new Error('Operação inválida');
        }
    }
}

export { FunctionController };