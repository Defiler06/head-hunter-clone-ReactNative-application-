import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { IChat } from '../interfaces/IChat';
import { Message } from './Message';

@Entity()
export class Chat implements IChat {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ nullable: true })
	chat: string;

	@OneToMany(() => Message, (message) => message.chat)
	@JoinColumn()
	messages: Message[];
}
