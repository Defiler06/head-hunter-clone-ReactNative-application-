import { Request, Response } from 'express';
import { Activity } from '../entity/Activity';
import { AppDataSource } from '../data-source';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import express from 'express';
import { IActivity } from '@src/interfaces/IActivity';
import {
	deleteActivity,
	getActivity,
	postActivity,
	putActivity,
	getActivityById
} from '@src/repository/activity.repository';
import Logger from '@src/helpers/Logger';

const controller = express();

controller.get('/', async (req: Request, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allActivities = await getActivity();
		res.json(allActivities);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.get('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allActivities = await getActivityById(id);
		res.json(allActivities);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async (req: Request, res: Response) => {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const newActivity = req.body as IActivity;
		try {
			const activityNew = await postActivity(newActivity);
			res.send(activityNew);
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
		const updateAcitivity = req.body as IActivity;
		try {
			const putChangeActivity = await putActivity(id, updateAcitivity);
			res.send(putChangeActivity);
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
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const { id } = req.params;
		try {
			await deleteActivity(id);
			res.send('Активити удален');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

export default controller;
