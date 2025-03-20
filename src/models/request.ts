import { Sequelize, DataTypes, Model } from 'sequelize';

export class Request extends Model {
    public id!: number;
    public status!: string;
    public subject!: string;
    public text!: string;
    public solution_text!: string | null;
    public cancellation_reason!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: any) => {
    console.log("Sequelize instance in model:", sequelize);
    Request.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM('Новое', 'В работе', 'Завершено', 'Отменено'),
            defaultValue: 'Новое',
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        solution_text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cancellation_reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Request',
    });
    return Request;
};
