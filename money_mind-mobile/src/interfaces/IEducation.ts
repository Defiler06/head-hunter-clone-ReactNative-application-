import { ILesson } from './ILesson';

export interface IEducation {
	id: string;
	user_id: string;
	lesson: ILesson;
	text_homework: string;
	date_start: Date;
	date_end: Date;
	checked: boolean;
	coins: number;
	isActive: boolean;
	isPassed: boolean;
	image: string;
}
