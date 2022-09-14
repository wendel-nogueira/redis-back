import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';


class Logs extends Model {
    public id!: number;
    public operation!: string;
    public date!: Date;
}

Logs.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    operation: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "logs",
    sequelize,
    timestamps: false,
});

Logs.sync({ force: false });

export { Logs };