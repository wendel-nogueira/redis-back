import { Sequelize } from 'sequelize';
import 'dotenv/config';


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});

export { sequelize };