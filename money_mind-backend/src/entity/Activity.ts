import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { User } from './User';
import { IActivity } from '../interfaces/IActivity';

@Entity()
export class Activity implements IActivity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ nullable: true })
	activity: string;

	@OneToMany(() => User, (user) => user.id_activity)
	@JoinColumn()
	users: User[];
}
