import { UserRole } from '../helpers/enum/UserRole.enum';

export interface IUser {
	id: number;
	email: string;
	login: string;
	id_category: string;
	id_avatar: string;
	role: UserRole;
	date_register: string;
	last_seen: string;
	password: string;
	token: string;
	phone_number: string;
	image: string;
}
