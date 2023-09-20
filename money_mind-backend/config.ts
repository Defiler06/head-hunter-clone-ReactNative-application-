import path from 'path';
import dotenv from 'dotenv';

export const rootPath = __dirname;

export const uploadImagePath = path.join(rootPath, 'public/image');
export const uploadAvatarPath = path.join(rootPath, 'public/avatar');
export const uploadEducationPath = path.join(
	rootPath,
	'public/educationImages',
);
export const uploadProductPath = path.join(rootPath, 'public/store');
dotenv.config();
