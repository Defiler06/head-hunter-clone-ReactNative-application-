import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class CategoryHistory {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => User, (user) => user.id)
	id_user: User;

	@Column() //подключить к сущности Категория
	id_category: string;

	@Column()
	date_start: Date;

	@Column()
	date_end: Date;
}
