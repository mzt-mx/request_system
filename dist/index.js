"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const sequelize_1 = require("sequelize");
const request_1 = __importDefault(require("./models/request"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/requests', requestRoutes_1.default);
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './requests_system.sqlite',
});
exports.sequelize = sequelize;
const Request = (0, request_1.default)(sequelize);
exports.Request = Request;
sequelize.sync({ force: true })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database synced');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}))
    .catch((error) => {
    console.error('Database sync failed', error);
});
