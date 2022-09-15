import { Sequelize } from 'sequelize';
import 'dotenv/config';
import { resolve } from 'path';



class Database {
    public connection: Sequelize;


    constructor() {
        this.init();
    }

    private init(): void {
        this.connection = new Sequelize({
            dialect: 'sqlite',
            storage: resolve(__dirname, '../../../db.sqlite'),
            logging: false,
        });
    }

    public async connect(): Promise<void> {
        try {
            await this.connection.authenticate();

            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default new Database();