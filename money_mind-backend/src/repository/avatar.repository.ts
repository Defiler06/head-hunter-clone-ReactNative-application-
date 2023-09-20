import { Avatar } from '../entity/Avatar';
import { AppDataSource } from '../data-source';

// eslint-disable-next-line max-len
export const getAvatar = async (): Promise<Avatar[]> => {
	const avatarRepo = AppDataSource.getRepository(Avatar);
	const allRecords = await avatarRepo.find();
	return allRecords;
};

export const postAvatar = async (avatar: string): Promise<void> => {
	const avatars = new Avatar();
	avatars.avatar = avatar;
	const result = await AppDataSource.manager.save(avatars);
};

export const putAvatar = async (id: string, avatar: string): Promise<void> => {
	const avatarRepo = AppDataSource.getRepository(Avatar);
	const result = await avatarRepo.update(Number(id), { avatar: avatar });
};

export const deleteAvatar = async (id: string): Promise<void> => {
	const avatarRepo = AppDataSource.getRepository(Avatar);
	await avatarRepo.delete(id);
};
