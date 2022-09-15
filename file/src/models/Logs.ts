import { DataTypes, Model } from 'sequelize';
import Database from '../db';



class Logs extends Model {
    public id!: number;
    public channel!: string;
    public info!: string;
    public date!: Date;
}

Logs.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    channel: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    info: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'logs',
    sequelize: Database.connection,
    timestamps: false,
});

Logs.sync({ force: false });

export { Logs };