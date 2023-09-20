import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IMaterial } from '../interfaces/IMaterial';
import { Lesson } from '../entity/Lesson';

@Entity()
export class Material implements IMaterial {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
	})
	path: string;

	@Column({
		nullable: false,
	})
	mainfi: number;

	@ManyToMany(() => Lesson, (lesson) => lesson.materials)
	lessons: Lesson[];
}
