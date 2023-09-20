import { app } from '@src/server';
import * as http from 'http';
import { Server } from 'socket.io';
import { Message } from '@src/entity/Message';
import { AppDataSource } from '@src/data-source';
import { IContent } from '@src/interfaces/IContent';
import { getChatById } from '@src/repository/chat.repository';
import { getUserById } from '@src/repository/user.repository';

export const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3002' } });
import { findBadWord } from './helpers/FindBadWord';
import Logger from './helpers/Logger';

const messageRepository = AppDataSource.getRepository(Message);

io.on('connection', async (socket) => {
	socket.on('join-chat', (chatRoomId: string) => {
		try {
			Logger.info('Socket/Received: join-chat');
			socket.join(chatRoomId);
		} catch (e) {
			Logger.error('Socket/Error: join-chat');
		}
	});

	socket.on('send-message', async (content: IContent) => {
		try {
			Logger.info('Socket/Received: send-message');
			const message = new Message();

			const chat = await getChatById(content.chat);
			const user = await getUserById(content.user);

			message.message = findBadWord(content.message);
			message.user = user;
			message.chat = chat;

			await message.save();

			const newMessage = await messageRepository.findOne({
				where: {
					id: message.id,
				},
				relations: {
					chat: true,
					user: true,
				},
			});

			io.to(content.chat).emit('message', newMessage);
		} catch (e) {
			Logger.error('Socket/Error: send-message');
		}
	});

	socket.on(
		'get-all-messages',
		async (info: { chatRoomId: string; size: number; offset: number }) => {
			try {
				Logger.info('Socket/Received: get-all-messages');
				const { chatRoomId, size, offset } = info;

				const messageCount = await messageRepository.count({
					where: {
						chat: { id: chatRoomId },
					},
				});

				if (messageCount >= offset) {
					const messages = await messageRepository.find({
						where: {
							chat: { id: chatRoomId },
						},
						relations: {
							chat: true,
							user: true,
						},
						order: {
							date_register: 'DESC',
						},
						skip: offset,
						take: size,
					});

					if (messages) {
						socket.emit('serverResponse', messages);
					}
				} else {
					console.log('messages not found');
				}
			} catch (e) {
				Logger.error('Socket/Error: get-all-messages');
			}
		},
	);
});

export default server;
