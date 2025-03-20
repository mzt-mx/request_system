"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/requests', requestRoutes_1.default);
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './requests_system.sqlite',
});
exports.sequelize = sequelize;
sequelize.sync()
    .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Database sync failed', error);
});
