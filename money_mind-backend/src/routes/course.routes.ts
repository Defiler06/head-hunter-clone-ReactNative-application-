import { Request, Response } from 'express';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import express from 'express';
import {
	deleteCourse,
	getCourse,
	postCourse,
	putCourse,
} from '@src/repository/course.repository';
import { ICourse } from '@src/interfaces/ICourse';
import Logger from '@src/helpers/Logger';

const controller = express();

controller.get('/', async (req: Request, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allCourses = await getCourse();
		res.json(allCourses);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async (req: Request, res: Response) => {
		const newCourse = req.body as ICourse;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const courseNew = await postCourse(newCourse);
			res.send(courseNew);
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
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const { id } = req.params;
		const updateCourse = req.body as ICourse;
		try {
			const putChangeCourse = await putCourse(id, updateCourse);
			res.send(putChangeCourse);
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
			await deleteCourse(id);
			res.send('Курс удален');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

export default controller;
