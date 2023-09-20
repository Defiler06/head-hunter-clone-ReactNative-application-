import { fixture, install } from 'typeorm-fixture-builder';
import { Activity } from '../entity/Activity';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';
import logger from 'jet-logger';
import { faker } from '@faker-js/faker';
import { Course } from '../entity/Course';

dotenv.config({
	path: path.join(__dirname, `../env/${process.env.NODE_ENV}.env`),
});

export function createRandomActivity(): Activity {
	return fixture(Activity, {
		activity: faker.company.name(),
	});
}
export const ACTIVITY: Activity[] = faker.helpers.multiple(
	createRandomActivity,
	{
		count: 5,
	},
);

export function createRandomUser(): User {
	return fixture(User, {
		email: faker.internet.email(),
		displayName: faker.internet.displayName(),
		role: 'User',
		isActivated: true,
		isCoinsAvailable: false,
		ActivationLink: uuidv4(),
		password: '$2b$10$X6YgOiQGS9mGLE7TYHS/guARIFMgUKeLeJgecGXNp.uzJrYBm2aJK',
	});
}

export const USER: User[] = faker.helpers.multiple(createRandomUser, {
	count: 5,
});

export function createRandomCourse(): Course {
	return fixture(Course, {
		course: faker.company.name(),
	});
}
export const COURSE: Course[] = faker.helpers.multiple(createRandomCourse, {
	count: 5,
});

const run = async () => {
	AppDataSource.initialize()
		.then(async () => {
			console.log(
				`Initialize connection to the database: ${process.env.DB_NAME}`,
			);

			await install(AppDataSource, [...ACTIVITY, ...USER, ...COURSE]);
		})
		.catch((error) => console.log(error));
};

run().catch((e) => logger.err(e));
