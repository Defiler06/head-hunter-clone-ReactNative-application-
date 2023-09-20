import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.messages)
	@JoinColumn()
	user: User;

	@ManyToOne(() => Chat, (chat) => chat.messages)
	@JoinColumn()
	chat: Chat;

	@Column({ nullable: true })
	message: string;

	@CreateDateColumn()
	date_register: Date;
}
