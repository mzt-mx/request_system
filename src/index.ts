import express from 'express';
import requestRoutes from './routes/requestRoutes';
import { Sequelize } from 'sequelize';
import RequestModel from './models/request';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/requests', requestRoutes);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './requests_system.sqlite',
});

const Request = RequestModel(sequelize);

sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Database sync failed', error);
    });

export { sequelize, Request };
