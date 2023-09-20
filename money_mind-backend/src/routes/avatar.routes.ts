import express, { Request, Response } from 'express';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { uploadAvatarPath } from '../../config';
import authMiddleware from '../middlewares/auth.middleware';
import {
	getAvatar,
	postAvatar,
	putAvatar,
	deleteAvatar,
} from '../repository/avatar.repository';
import Logger from '@src/helpers/Logger';

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadAvatarPath);
	},
	filename(req, file, cb) {
		cb(null, nanoid() + path.extname(file.originalname));
	},
});
const upload = multer({ storage });

router.get('/', async function (req: Request, res: Response) {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allAvatars = await getAvatar();
		 
		
		res.json(allAvatars);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

router.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	upload.single('avatar'),
	async function (req: Request, res: Response) {
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			let avatar = '';
			if (req.file) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				avatar = req.file.filename;
			}
			const newAvatar = await postAvatar(avatar);
			res.send(newAvatar);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

router.put(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	upload.single('avatar'),
	async function (req: Request, res: Response) {
		const { id } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			let avatar = '';
			if (req.file) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				avatar = req.file.filename;
			}
			const putChangeAvatar = await putAvatar(id, avatar);
			res.send(putChangeAvatar);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

router.delete(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async function (req: Request, res: Response) {
		const { id } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const deleteAvaterNow = await deleteAvatar(id);
			res.send('Аватар удален');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

export default router;
