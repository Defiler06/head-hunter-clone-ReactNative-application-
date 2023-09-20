import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

const res = dotenv.config({
	path: path.join(__dirname, `../env/${process.env.NODE_ENV}.env`),
});

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.HOST_DB || 'postgres',
	port: Number(process.env.PORT_DB) || 5432,
	username: process.env.USER_DB || 'root',
	password: process.env.PASSWORD_DB || 'qwerty',
	database: process.env.DB_NAME || 'esdp3',
	synchronize: true,
	logging: false,
	entities: ['src/entity/*{.ts,.js}'],
	migrations: [],
	subscribers: [],
}); 