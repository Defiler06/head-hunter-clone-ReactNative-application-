import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';
import { tr } from '@faker-js/faker';

@Entity()
export class Education extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.education)
	@JoinColumn()
	user: User;

	@ManyToOne(() => Lesson, (lesson) => lesson.education)
	@JoinColumn()
	lesson: Lesson;

	@Column()
	text_homework: string;

	@CreateDateColumn()
	date_start: Date;

	@UpdateDateColumn({
		nullable: true,
	})
	date_end: Date;

	@Column({
		default: false,
	})
	checked: boolean;

	@Column({
		default: 0,
	})
	coins: number;

	@Column({ default: false })
	isActive: boolean;

	@Column({ default: false })
	isPassed: boolean;

	@Column({ nullable: true })
	image: string;
}
