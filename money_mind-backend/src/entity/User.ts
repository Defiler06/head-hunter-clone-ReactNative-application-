import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserRole } from '../helpers/enum/UserRole.enum';
import bcrypt from 'bcrypt';
import { Activity } from './Activity';
import { Avatar } from './Avatar';
import { Education } from './Education';
import { Message } from '@src/entity/Message';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
		unique: true,
	})
	@IsEmail()
	email: string;

	@Column({
		length: 100,
		default: 'default',
	})
	displayName: string;

	@ManyToOne(() => Activity, (activity) => activity.users)
	@JoinColumn()
	id_activity: Activity;

	@ManyToOne(() => Avatar, (avatar) => avatar.users)
	@JoinColumn()
	id_avatar: Avatar;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.User,
	})
	role: string;

	@CreateDateColumn()
	date_register: Date;

	@UpdateDateColumn()
	last_seen: Date;

	@Column()
	password: string;

	@Column({
		default: 'default',
	})
	phone_number: string;

	@Column({
		default: 'default',
	})
	image: string;

	@Column({ default: false })
	isActivated: boolean;

	@Column({ default: 'default' })
	ActivationLink: string;

	@OneToMany(() => Education, (education) => education.user)
	@JoinColumn()
	education: Education[];

	@Column({ nullable: true })
	userCoins: number;

	@Column({ nullable: true })
	isCoinsAvailable: boolean;

	@OneToMany(() => Education, (message) => message.user)
	@JoinColumn()
	messages: Message[];

	async comparePassword(this: User, password: string) {
		return await bcrypt.compare(password, this.password);
	}

	async encryptPassword(password: string) {
		const saltRounds = 10;

		const salt = await bcrypt.genSalt(saltRounds);

		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	}
}
