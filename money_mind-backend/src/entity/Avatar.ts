import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { IAvatar } from '@src/interfaces/IAvatar';
import { User } from './User';

@Entity()
export class Avatar implements IAvatar {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', { length: 100 })
	avatar: string;

	@OneToMany(() => User, (user) => user.id_avatar)
	@JoinColumn()
	users: User[];
}
