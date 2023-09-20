export class CreateEducationDto {
	user_id: string;
	lesson: string;
	text_homework: string;
	date_start: Date;
	date_end: Date;
	checked: boolean;
	coins: number;
	isActive: boolean;
	isPassed: boolean;
	image: string;
	public constructor(
		user_id: string,
		lesson: string,
		text_homework: string,
		date_start: Date,
		date_end: Date,
		checked: boolean,
		coins: number,
		isActive: boolean,
		isPassed: boolean,
		image: string,
	) {
		this.user_id = user_id;
		this.lesson = lesson;
		this.text_homework = text_homework;
		this.date_start = date_start;
		this.date_end = date_end;
		this.checked = checked;
		(this.coins = coins), (this.isActive = isActive);
		this.isPassed = isPassed;
		this.image = image;
	}
}
