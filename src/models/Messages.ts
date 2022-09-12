import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';


class Messages extends Model {
    public id!: number;
    public message!: string;
    public response!: string;
}

Messages.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    response: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: "messages",
    sequelize,
    timestamps: false,
});

Messages.sync({ force: false });

export { Messages };