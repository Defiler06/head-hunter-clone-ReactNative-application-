import { IEducation } from './IEducation';

export interface IUserInfo {
	id: number;
	email: string;
	displayName: string;
	id_activity: {
		activity: string;
	};
	id_avatar: {
		avatar: string;
	};
	phone_number: string;
	image: string;
	accesToken: string;
	education: IEducation[];
}
