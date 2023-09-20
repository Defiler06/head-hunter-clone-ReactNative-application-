import { ICourse } from '@src/interfaces/ICourse';
import { AppDataSource } from '../data-source';
import { Course } from '@src/entity/Course';

export const getCourse = async (): Promise<Course[]> => {
	const course = AppDataSource.getRepository(Course);
	const allRecords = await course.find({
		relations: {
			lesson: true,
		},
	});
	return allRecords;
};

export const postCourse = async (newCourse: ICourse): Promise<void> => {
	const course = AppDataSource.getRepository(Course).create(newCourse);
	const results = await AppDataSource.getRepository(Course).save(course);
};

export const putCourse = async (
	id: string,
	updateCourse: ICourse,
): Promise<void> => {
	const course = await AppDataSource.getRepository(Course).findOneBy({
		id: Number(id),
	});
	if (course) {
		AppDataSource.getRepository(Course).merge(course, updateCourse);
		const result = await AppDataSource.getRepository(Course).save(course);
	}
};

export const deleteCourse = async (id: string): Promise<void> => {
	const results = await AppDataSource.getRepository(Course).delete(id);
};
