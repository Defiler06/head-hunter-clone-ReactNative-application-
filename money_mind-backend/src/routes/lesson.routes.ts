import { Request, Response } from 'express';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import express from 'express';
import {
	deleteLesson,
	getLesson,
	postLesson,
	putLesson,
} from '@src/repository/lesson.repository';
import { ILesson } from '@src/interfaces/ILesson';
import Logger from '@src/helpers/Logger';

const controller = express();

controller.get('/', async (req: Request, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allLesson = await getLesson();
		// res.json(allLesson);
		res.send(allLesson.sort((a,b)=>a.nord - b.nord));
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: Request, res: Response) => {
		const newLesson = req.body as ILesson;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const lessonNew = await postLesson(newLesson);
			res.send(lessonNew);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

controller.put(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const updateLesson = req.body as ILesson;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const putChangeLesson = await putLesson(id, updateLesson);
			res.send(putChangeLesson);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

controller.delete(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			await deleteLesson(id);
			res.send('Урок удален');
		} catch (e) {
			res.send(e);
		}
	},
);

export default controller;
