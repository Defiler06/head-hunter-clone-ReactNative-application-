import path from 'path';
import { Router, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import multer from 'multer';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { uploadImagePath } from '../../config';
import { nanoid } from 'nanoid';
import {
	signUp,
	signIn,
	updateUser,
	getUsers,
	activateLink,
	getUserById,
	getUserInfo,
} from '@src/repository/user.repository';
import { IUserData } from '@src/interfaces/IUserData';
import authMiddleware from '@src/middlewares/auth.middleware';
import { IRequest } from '@src/interfaces/IRequest';
import Logger from '@src/helpers/Logger';

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadImagePath);
	},
	filename(req, file, cb) {
		cb(null, nanoid() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

router.post('/signup', upload.single('image'), async (req, res) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const newUser = req.body as IUserData;
		if (newUser.password.trim() === '') {
			return res.status(400).send({ error: 'Укажите пароль' });
		}

		if (newUser.email.trim() === '') {
			return res.status(400).send({ error: 'Укажите пользователя' });
		}
		if (req.file) {
			newUser.image = req.file.filename;
		}

		const createdUser = await signUp(newUser);

		res.send(createdUser);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		if (e instanceof QueryFailedError) {
			res.status(400).send({ error: `${e.driverError.detail}` });
		} else if (e) {
			res.status(400).send({ error: `${e}` });
		}
	}
});

router.post('/signin', async (req, res) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const user = await signIn(req.body as IUserData);

		const isValid = await user.comparePassword(req.body.password);
		if (!isValid) {
			return res.status(400).send({ error: 'Пароль введен некорректно' });
		}
		if (isValid && user.role === 'User') {
			//После добавления Админа не забыть обновить user.role на Admin
			const accessToken = jwt.sign({ userId: user.id }, 'your-secret-key', {
				expiresIn: '1h',
			});

			const refreshToken = jwt.sign({ userId: user.id }, 'your-secret-key');

			res.json({ accessToken, refreshToken });
		} else {
			const accessToken = jwt.sign({ userId: user.id }, 'your-secret-key');

			res.json({ accessToken });
		}
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.status(400).send({ error: `${e}` });
	}
});

router.post(
	'/user-info',
	[authMiddleware],
	async (req: IRequest, res: Response) => {
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const updatedUser = await updateUser(req.user, req.body);

			res.send(updatedUser);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.status(400).send({ error: `${e}` });
		}
	},
);

router.post('/refresh-token', async (req: IRequest, res: Response) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ message: 'Отсутствует токен' });
	}

	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const decodedRefreshToken = jwt.verify(refreshToken, 'your-secret-key');

		const { userId } = decodedRefreshToken as jwt.JwtPayload;

		const user = await getUserById(userId);

		if (user && user.role === 'User') {
			//После добавления Админа не забыть обновить user.role на Admin
			const accessToken = jwt.sign({ userId: user.id }, 'your-secret-key', {
				expiresIn: '1h',
			});

			res.json({ accessToken });
		} else {
			res.send({ error: 'Токен обновляется только для админов' });
		}
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		if (e instanceof JsonWebTokenError) {
			res.status(500).send(e);
		} else {
			res.status(400).send({ error: `${e}` });
		}
	}
});

router.get('/users', async (req: IRequest, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allUsers = await getUsers();
		res.json(allUsers);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

router.get(
	'/activate/:ActivationLink',
	async (req: IRequest, res: Response) => {
		const { ActivationLink } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const activate = await activateLink(ActivationLink);
			// return res.redirect('https://google.com');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			console.log(e);
		}
	},
);

router.get('/user', [authMiddleware], async (req: IRequest, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const id = req.user[0].id;
		const selectedUser = await getUserInfo(id);
		res.send(selectedUser);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.status(400).send({ error: `${e}` });
	}
});

export default router;
