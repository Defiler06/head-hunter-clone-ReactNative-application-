import { User } from '@src/entity/User';
import { AppDataSource } from '@src/data-source';
import { validate } from 'class-validator';
import { IUserData } from '@src/interfaces/IUserData';
import { IUpdateUser } from '@src/interfaces/IUpdateUser';
import sendEmail from '@src/services/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { Activity } from '@src/entity/Activity';
import { Avatar } from '@src/entity/Avatar';
import { LessThan } from 'typeorm';

const userRepository = AppDataSource.getRepository(User);

export const signIn = async (userData: IUserData): Promise<User> => {
	const user = await userRepository.findOne({
		where: { email: userData.email },
	});

	if (user === null) {
		throw new Error('Пользователь не найден');
	}else if(user.isActivated === false){
    throw new Error('Активируйте ссылку на почте');
  } else {
		return user;
	}
};

export const signUp = async (userData: IUserData): Promise<User> => {
	const activationLink = uuidv4();
	const user = new User();
	const hashedPassword = await user.encryptPassword(userData.password);
	user.password = hashedPassword;
	user.email = userData.email.toLowerCase();

	user.ActivationLink = activationLink;
  console.log(activationLink);
  
	const test = await sendEmail(
		userData.email,
		`http://localhost:3001/activate/${activationLink}`,
	);
	const errors = await validate(user);

	if (errors.length > 0) {
		throw new Error('Вы ввели не email');
	} else {
		return await userRepository.save(user);
	}
};

export const updateUser = async (
	user: User[],
	updateUser: IUpdateUser,
): Promise<void> => {
	const id = user[0].id;

	try {
		const activityRepository = AppDataSource.getRepository(Activity);
		const avatarRepository = AppDataSource.getRepository(Avatar);
		const activity = await activityRepository.findOneBy({
			id: updateUser.idActivity,
		});
		const avatar = await avatarRepository.findOneBy({
			id: Number(updateUser.idAvatar),
		});
		const user = await userRepository.findOneBy({
			id: id,
		});
		if (activity && user && avatar) {
			user.id_activity = activity;
			user.displayName = updateUser.displayName;
			user.id_avatar = avatar;
			await userRepository.save(user);
		}
	} catch (e) {
		throw new Error('Аватар или деятельность не найдена');
	}
};

export const getUserById = async (id: string): Promise<User> => {
	const user = await userRepository.findOneBy({ id: Number(id) });

	if (user) {
		return user;
	} else {
		throw new Error('Пользователь не найден');
	}
};

export const getUserInfo = async (id: string): Promise<User[]> => {
	const user = await userRepository.find({
		where: {
			id: Number(id),
		},
		relations: {
			id_activity: true,
			id_avatar: true,
			education: true,
		},
	});
	if (user) {
		return user;
	} else {
		throw new Error('Пользователь не найден');
	}
};

export const getUsers = async (): Promise<User[]> => {
	const users = AppDataSource.getRepository(User);

	const allRecords = await users.find();

	return allRecords;
};

export const activateLink = async (activationLink: string): Promise<void> => {
	const userRepo = AppDataSource.getRepository(User);
 
 
  console.log("Repository " + activationLink);
  try{
	const user = await userRepo.find({ where: { ActivationLink: activationLink } });
  
	if (!user) {
		throw new Error('Ссылка не активна');
	}
  
	user[0].isActivated = true;
	await userRepo.update(Number(user[0].id), { isActivated: true });

} catch(e){
  throw new Error('Пользователь не найден');
}
};

export const deleteUnconfirmedUsers = async () => {
	try {
		const userRepository = AppDataSource.getRepository(User);
		const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

		const unconfirmedUsers = await userRepository.findOne({
			where: {
				date_register: LessThan(oneDayAgo),
				isActivated: false,
			},
		});

		if (unconfirmedUsers) {
			await userRepository.remove(unconfirmedUsers);
			console.log('Удалена почта ', unconfirmedUsers.email);
		}
	} catch (error) {
		console.error('Ошибка при удалении неподтвержденных пользователей:', error);
	}
};
