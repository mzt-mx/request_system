import { Request } from '../models/request'; // Import the Request class directly
import { Op } from 'sequelize';

export const createRequest = async (req: any, res: any) => {
    try {
        const request = await Request.create(req.body);
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось создать обращение' });
    }
};

export const takeRequestInProgress = async (req: any, res: any) => {
    try {
        const request = await Request.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }
        request.status = 'В работе';
        await request.save();
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось изменить статус обращения' });
    }
};

export const completeRequest = async (req: any, res: any) => {
    try {
        const request = await Request.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }
        request.status = 'Завершено';
        request.solution_text = req.body.solution_text;
        await request.save();
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось завершить обращение' });
    }
};

export const cancelRequest = async (req: any, res: any) => {
    try {
        const request = await Request.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Обращение не найдено' });
        }
        request.status = 'Отменено';
        request.cancellation_reason = req.body.cancellation_reason;
        await request.save();
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось отменить обращение' });
    }
};

export const getRequestList = async (req: any, res: any) => {
    try {
        const { date, startDate, endDate } = req.query;
        let whereClause: any = {};
        if (date) {
            whereClause.createdAt = date;
        } else if (startDate && endDate) {
            whereClause.createdAt = { [Op.between]: [startDate, endDate] };
        }
        const requests = await Request.findAll({ where: whereClause });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить список обращений' });
    }
};

export const cancelInProgressRequests = async (req: any, res: any) => {
    try {
        await Request.update({ status: 'Отменено' }, { where: { status: 'В работе' } });
        res.json({ message: 'Все обращения в статусе "В работе" были отменены' });
    } catch (error) {
        res.status(500).json({ error: 'Не удалось отменить обращения в статусе "В работе"' });
    }
};
