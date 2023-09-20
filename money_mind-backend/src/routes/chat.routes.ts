import { Request, Response } from 'express';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import express from 'express';
import { createChat, getChats } from '@src/repository/chat.repository';
import { IChat } from '@src/interfaces/IChat';
import Logger from '@src/helpers/Logger';

const controller = express();

controller.get('/', async (req: Request, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allChats = await getChats();
		res.json(allChats);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async (req: Request, res: Response) => {
		const newChat = req.body as IChat;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const chat = await createChat(newChat);
			res.send(chat);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

export default controller;
