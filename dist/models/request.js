"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const sequelize_1 = require("sequelize");
class Request extends sequelize_1.Model {
}
exports.Request = Request;
exports.default = (sequelize) => {
    console.log("Sequelize instance in model:", sequelize);
    Request.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('Новое', 'В работе', 'Завершено', 'Отменено'),
            defaultValue: 'Новое',
        },
        subject: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        solution_text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        cancellation_reason: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Request',
    });
    return Request;
};
