import { Request, Response } from 'express';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import express from 'express';
import {
	deleteMaterial,
	getMaterial,
	postMaterial,
	putMaterial,
} from '@src/repository/material.repository';
import { IMaterial } from '@src/interfaces/IMaterial';
import Logger from '@src/helpers/Logger';

const controller = express();

controller.get('/', async (req: Request, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allMaterials = await getMaterial();
		res.json(allMaterials);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: Request, res: Response) => {
		const newMaterial = req.body as IMaterial;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const materialNew = await postMaterial(newMaterial);
			res.send(materialNew);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

controller.put(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const updateMaterial = req.body as IMaterial;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const putChangeMaterial = await putMaterial(id, updateMaterial);
			res.send(putChangeMaterial);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

controller.delete(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			await deleteMaterial(id);
			res.send('Материал удален');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

export default controller;
