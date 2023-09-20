import { Request, Response } from 'express';
import { permitMiddleware } from '../middlewares/permit.middleware';
import { UserRole } from '../helpers/enum/UserRole.enum';
import authMiddleware from '../middlewares/auth.middleware';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadProductPath } from 'config';
import { nanoid } from 'nanoid';
import {
	getProducts,
	getProductById,
	createProduct,
	changeProduct,
	deleteProduct,
} from '@src/repository/product.repository';
import { IProduct } from '@src/interfaces/IProduct';
import Logger from '@src/helpers/Logger';

const controller = express();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadProductPath);
	},
	filename(req, file, cb) {
		cb(null, nanoid() + path.extname(file.originalname));
	},
});
const upload = multer({ storage });

controller.get('/', async (req: Request, res: Response) => {
	try {
		Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		const allProducts = await getProducts();
		res.json(allProducts);
	} catch (e) {
		Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
		res.send(e);
	}
});

controller.get(
	'/:id',
	[authMiddleware, permitMiddleware(UserRole.Admin)],
	async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const product = await getProductById(id);
			res.send(product);
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

controller.post(
	'/',
	[authMiddleware, permitMiddleware(UserRole.User)],
	upload.single('image'),
	async function (req: Request, res: Response) {
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const product = req.body as IProduct;
			let image = '';
			if (req.file) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				image = req.file.filename;
				product.image = image;
			}
			const newProduct = await createProduct(product);
			res.send(newProduct);
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
		const updateProduct = req.body as IProduct;
		try {
			Logger.info(`Received: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			const product = await changeProduct(id, updateProduct);
			res.send(product);
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
			await deleteProduct(id);
			res.send('Продукт удален');
		} catch (e) {
			Logger.error(`Error: ${req.method} ${req.baseUrl} ${res.statusCode}`);
			res.send(e);
		}
	},
);

export default controller;
