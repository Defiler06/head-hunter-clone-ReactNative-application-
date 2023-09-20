import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ICourse } from '../interfaces/ICourse';
import { Lesson } from '../entity/Lesson';

@Entity()
export class Course implements ICourse {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
	})
	course: string;

	@ManyToOne(() => Lesson, (lesson) => lesson.course)
	@JoinColumn()
	lesson: Lesson[];
}
