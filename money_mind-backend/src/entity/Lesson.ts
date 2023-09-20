import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
} from 'typeorm';
import { ILesson } from '../interfaces/ILesson';
import { Course } from '../entity/Course';
import { Material } from '../entity/Material';
import { Education } from './Education';

@Entity()
export class Lesson implements ILesson {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Course, (course) => course.lesson)
	@JoinColumn()
	course: Course;

	@ManyToOne(() => Education, (education) => education.lesson)
	@JoinColumn()
	education: Education;

	@Column({
		nullable: false,
	})
	nord: number;

	@Column({
		nullable: false,
	})
	coin_number: number;

	@Column({
		nullable: false,
	})
	day_to_learn: number;

	@Column({
		nullable: true,
	})
	homework: string;

	@Column({
		nullable: false,
	})
	title: string;

	@Column({
		nullable: false,
	})
	text: string;

	@Column({
		nullable: true,
	})
	videolink: string;

	@ManyToMany(() => Material)
	@JoinTable()
	materials: Material[];
}
