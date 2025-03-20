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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelInProgressRequests = exports.getRequestList = exports.cancelRequest = exports.completeRequest = exports.takeRequestInProgress = exports.createRequest = void 0;
const request_1 = require("../models/request");
const sequelize_1 = require("sequelize");
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield request_1.Request.create(req.body);
        res.status(201).json(request);
    }
    catch (error) {
        res.status(500).json({ error: 'Не удалось создать обращение' });
    }
});
exports.createRequest = createRequest;
const takeRequestInProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield request_1.Request.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }
        request.status = 'В работе';
        yield request.save();
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ error: 'Не удалось изменить статус обращения' });
    }
});
exports.takeRequestInProgress = takeRequestInProgress;
const completeRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield request_1.Request.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }
        request.status = 'Завершено';
        request.solution_text = req.body.solution_text;
        yield request.save();
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ error: 'Не удалось завершить обращение' });
    }
});
exports.completeRequest = completeRequest;
const cancelRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield request_1.Request.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }
        request.status = 'Отменено';
        request.cancellation_reason = req.body.cancellation_reason;
        yield request.save();
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ error: 'Не удалось отменить обращение' });
    }
});
exports.cancelRequest = cancelRequest;
const getRequestList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, startDate, endDate } = req.query;
        let whereClause = {};
        if (date) {
            whereClause.createdAt = date;
        }
        else if (startDate && endDate) {
            whereClause.createdAt = { [sequelize_1.Op.between]: [startDate, endDate] };
        }
        const requests = yield request_1.Request.findAll({ where: whereClause });
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ error: 'Не удалось получить список обращений' });
    }
});
exports.getRequestList = getRequestList;
const cancelInProgressRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield request_1.Request.update({ status: 'Отменено' }, { where: { status: 'В работе' } });
        res.json({ message: 'Все обращения в статусе "В работе" были отменены' });
    }
    catch (error) {
        res.status(500).json({ error: 'Не удалось отменить обращения в статусе "В работе"' });
    }
});
exports.cancelInProgressRequests = cancelInProgressRequests;
