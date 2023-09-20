import { ILesson } from '@src/interfaces/ILesson';
import { AppDataSource } from '../data-source';
import { Lesson } from '@src/entity/Lesson';

export const getLesson = async (): Promise<Lesson[]> => {
	const lesson = AppDataSource.getRepository(Lesson);
	const allRecords = await lesson.find({
		relations: {
			materials: true,
			course: true,
			education: true,
		},
	});
	return allRecords;
};

export const postLesson = async (newLesson: ILesson): Promise<void> => {
	const lesson = AppDataSource.getRepository(Lesson).create(newLesson);
	const result = await AppDataSource.getRepository(Lesson).save(lesson);
};

export const putLesson = async (
	id: string,
	updateLesson: ILesson,
): Promise<void> => {
	const lesson = await AppDataSource.getRepository(Lesson).findOneBy({
		id: Number(id),
	});
	if (lesson) {
		AppDataSource.getRepository(Lesson).merge(lesson, updateLesson);
		const result = await AppDataSource.getRepository(Lesson).save(lesson);
	}
};

export const deleteLesson = async (id: string): Promise<void> => {
	const results = await AppDataSource.getRepository(Lesson).delete(id);
};
