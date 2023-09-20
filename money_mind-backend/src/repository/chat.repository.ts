import { AppDataSource } from '../data-source';
import { Chat } from '@src/entity/Chat';
import { IChat } from '@src/interfaces/IChat';

export const getChats = async (): Promise<Chat[]> => {
	const chat = AppDataSource.getRepository(Chat);
	const allRecords = await chat.find();
	return allRecords;
};

export const getChatById = async (id: string): Promise<Chat> => {
	const chat = AppDataSource.getRepository(Chat);
	const result = await chat.findOneBy({ id });
	if (result === null) {
		throw new Error('Чат не найден');
	} else {
		return result;
	}
};

export const createChat = async (newChat: IChat): Promise<Chat> => {
	const chat = AppDataSource.getRepository(Chat).create(newChat);
	return await AppDataSource.getRepository(Chat).save(chat);
};
