import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { uploadEducationPath } from 'config';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import {
	getAllEducations,
	deleteEducation,
	createEducation,
	getEducationById,
	putEducation,
	getUserEducations,
	autoCreateEducation,
} from '../repository/education.repository';
import { CreateEducationDto } from '@src/dto/createEducation.dto';
import { IRequest } from '@src/interfaces/IRequest';
import { getLesson } from '@src/repository/lesson.repository';
import { getUserById } from '@src/repository/user.repository';
import { Lesson } from '@src/entity/Lesson';
import Logger from '@src/helpers/Logger';

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadEducationPath);
	},
	filename(req, file, cb) {
		cb(null, nanoid() + path.extname(file.originalname));
	},
});
const upload = multer({ storage });

router.get('/', async function (req: Request, res: Response) {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allEducations = await getAllEducations(); 
		res.json(allEducations);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});
 

router.get(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: IRequest, res: Response) => {
		const { id } = req.params;
		if (id === 'user-educations') {
			try {
				Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
				const id = req.user[0].id;
			  
				const userEducations = await getUserEducations(id); 
				
				res.send(userEducations.sort((a,b)=>a.lesson.nord - b.lesson.nord));
			} catch (e) {
				Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
				res.status(400).send({ error: `${e}` });
			}
		} else {
			try {
				Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
				const education = await getEducationById(id);
				res.send(education);
			} catch (e) {
				Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
				res.status(400).send({ error: `${e}` });
			}
		}
	},
);

router.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.User)],
	upload.single('image'),
	async function (req: Request, res: Response) {
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const education = req.body as CreateEducationDto;
			let image = '';
			if (req.file) {
				image = req.file.filename;
				education.image = image;
			}
			const newEducation = await createEducation(education);
			res.send(newEducation);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.status(400).send({ error: `${e}` });
		}
	},
);
 
router.put(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const updateEducation = req.body as CreateEducationDto;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const putChangeEducation = await putEducation(id, updateEducation);
			res.send(putChangeEducation);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

router.delete(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async function (req: Request, res: Response) {
		const { id } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			await deleteEducation(id);
			res.send('Курс успешно удален');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

router.post(
	'/auto-create-educations',
	[authMiddleware, permitMiddleware(UserRole.User)],
	async (req: IRequest, res: Response) => {
		const userId = req.user[0].id;
		const userEducations = await getUserEducations(userId);
		if (userEducations.length === 0) {
			try {
				Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
				const allLessons = await getLesson();
				const user = await getUserById(userId);
				if (allLessons && user) {
					const educations = allLessons.map(async (lesson: Lesson) => {
						return await autoCreateEducation(user, lesson);
					});
					res.status(200).send(educations);
				}
			} catch (e) {
				Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
				res.status(400).send({ error: `${e}` });
			}
		} else {
			res.status(400).send('Обучения уже созданы');
		}
	},
);

export default router;
