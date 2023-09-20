/**
 * Setup express server.
 */
import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import logger from './helpers/Logger';
import { AppDataSource } from './data-source';
import authRouter from '../src/routes/user.routes';
import activitiesController from './routes/activity.routes';
import avatarRoutes from './routes/avatar.routes';
import lessonRoutes from './routes/lesson.routes';
import materialRoutes from './routes/material.routes';
import courseRoutes from './routes/course.routes';
import educationRoutes from './routes/education.routes';
import chatRoutes from './routes/chat.routes';
import productRoutes from './routes/product.routes';
import server from '@src/socket';
import cors from 'cors';

// **** Variables **** //
dotenv.config({
	path: path.join(__dirname, `../env/${process.env.NODE_ENV}.env`),
});

export const app = express();
const PORT = process.env.PORT || 3000;

const run = async () => {
	AppDataSource.initialize()
		.then(async () => {
			logger.debug(
				`Initialize connection to the database: ${process.env.DB_NAME}`,
			);
			console.log('host_db'+process.env.HOST_DB);
		})
		.catch((error) => logger.error(error));
	app.listen(PORT, () => { 

		
		console.log('PORT_DB '+process.env.PORT_DB);
		console.log('USER_DB '+process.env.USER_DB);
		console.log('PASSWORD_DB '+process.env.PASSWORD_DB);
		console.log('DB_NAME ' +process.env.DB_NAME);
		logger.info(`Server is running on http://localhost:${PORT}`);		
	});

	server.listen(3002, () => console.log('Socket started on port 3002.'));
};

var corsOptions = {
	origin: "http://localhost:3000"
  };

app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOptions));

// cron.schedule('0 0 * * *', () => {
//   deleteUnconfirmedUsers();
// });

app.use('/activities', activitiesController);
app.use('/avatar', avatarRoutes);
app.use('/course', courseRoutes);
app.use('/material', materialRoutes);
app.use('/lesson', lessonRoutes);
app.use('/education', educationRoutes);
app.use('/chat', chatRoutes);
app.use('/product', productRoutes);
app.use(authRouter);

run().catch((e) => logger.error(e));
