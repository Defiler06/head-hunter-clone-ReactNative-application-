import { Education } from '@src/entity/Education';
import { AppDataSource } from '@src/data-source';
import { CreateEducationDto } from '@src/dto/createEducation.dto';
import { Lesson } from '@src/entity/Lesson';
import { User } from '@src/entity/User';
import { IUser } from '@src/interfaces/IUser';
import { IUpdateUser } from '@src/interfaces/IUpdateUser';

const educationRepository = AppDataSource.getRepository(Education);
const lessonRepository = AppDataSource.getRepository(Lesson);
const userRepository = AppDataSource.getRepository(User);

// eslint-disable-next-line max-len
export const getAllEducations = async (): Promise<Education[]> => {
	const allRecords = await educationRepository.find({
		relations: {
			lesson: true,
			user: true
		},
	});
	return allRecords.sort((a, b) => a.lesson.nord - b.lesson.nord);
}; 
 

export const getEducationById = async (id: string): Promise<Education> => {
	const education = await educationRepository.findOneBy({ id: Number(id) });
	if (education !== null) {
		return education;
	} else {
		throw new Error('Курс не найден!');
	}
};

export const createEducation = async (
	education: CreateEducationDto,
): Promise<Education> => {
	let newEducation = new Education();
	let user = await userRepository.findOneBy({
		id: Number(education.user_id),
	});
	if (user) {
		newEducation.user = user;
	}

	let lesson = await lessonRepository.findOneBy({
		id: Number(education.lesson),
	});
	if (lesson) {
		newEducation.lesson = lesson;
	}
	newEducation.text_homework = education.text_homework;
	newEducation.date_start = new Date();
	newEducation.checked = false;
	newEducation.coins = education.coins;
	return await educationRepository.save(newEducation);
};

export const putEducation = async (
	id: string,
	updateEducation: CreateEducationDto,
): Promise<void> => {
	const education = await AppDataSource.getRepository(Education).findOneBy({
		id: Number(id),
	});
	if (education) {
		// @ts-ignore
		AppDataSource.getRepository(Education).merge(education, updateEducation);
		const result = await AppDataSource.getRepository(Education).save(education);
	  const user = await AppDataSource.getRepository(User).findOneBy({
		id: education.user.id,
	  });

	  if (user) {
		const coins = user.userCoins + education.coins;
		AppDataSource.getRepository(User).merge(user, {userCoins: coins});
		const resultt = await AppDataSource.getRepository(User).save(user);
	  }
	}
};

export const deleteEducation = async (id: string): Promise<void> => {
	await educationRepository.delete(id);
};

export const getUserEducations = async (id: string): Promise<Education[]> => {
  const education = await educationRepository.find({
	where: {
	  user: {
		id: Number(id),
	  },
	},
	relations: {
	  lesson: true,
	  user: true
	},
  });
  if (education) {
	return education;
  } else {
	throw new Error('Обучение не найдено');
  }
};

export const autoCreateEducation = async (
	user: User,
	lesson: Lesson,
): Promise<Education> => {
	let newEducation = new Education();
	newEducation.user = user;
	newEducation.lesson = lesson;
	newEducation.text_homework = 'default';
	newEducation.date_start = new Date();
	newEducation.checked = false;
	newEducation.coins = lesson.coin_number;
	return await educationRepository.save(newEducation);
};
