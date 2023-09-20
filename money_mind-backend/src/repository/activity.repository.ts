import { IActivity } from '@src/interfaces/IActivity';
import { AppDataSource } from '../data-source';
import { Activity } from '@src/entity/Activity';

export const getActivity = async (): Promise<Activity[]> => {
	const activity = AppDataSource.getRepository(Activity);
	const allRecords = await activity.find();
	return allRecords;
};

 

export const postActivity = async (newActivity: IActivity): Promise<void> => {
	const activity = AppDataSource.getRepository(Activity).create(newActivity);
	const results = await AppDataSource.getRepository(Activity).save(activity);
};

export const putActivity = async (
	id: string,
	updateAcitivity: IActivity,
): Promise<void> => {
	const activity = await AppDataSource.getRepository(Activity).findOneBy({
		id: id,
	});
	if (activity instanceof Activity) {
		AppDataSource.getRepository(Activity).merge(activity, updateAcitivity);
		const results = await AppDataSource.getRepository(Activity).save(activity);
	}
};

export const deleteActivity = async (id: string): Promise<void> => {
	const results = await AppDataSource.getRepository(Activity).delete(id);
};

export const getActivityById = async (id: string): Promise<Activity> => {
	const activity = AppDataSource.getRepository(Activity);
	const result = await activity.findOneBy({ id });
	if (result === null) {
		throw new Error('Деятельность не найдена');
	} else {
		return result;
	}
};
