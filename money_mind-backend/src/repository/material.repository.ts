import { AppDataSource } from '../data-source';
import { Material } from '@src/entity/Material';
import { IMaterial } from '@src/interfaces/IMaterial';
import { Avatar } from '@src/entity/Avatar';
import { Lesson } from '@src/entity/Lesson';

export const getMaterial = async (): Promise<Material[]> => {
	const materialRepo = AppDataSource.getRepository(Material);
	const allRecords = await materialRepo.find();
	return allRecords;
};

export const postMaterial = async (newMaterial: IMaterial): Promise<void> => {
	const material = AppDataSource.getRepository(Material).create(newMaterial);
	const results = await AppDataSource.getRepository(Material).save(material);
};

export const putMaterial = async (
	id: string,
	newMaterial: IMaterial,
): Promise<void> => {
	const material = await AppDataSource.getRepository(Material).findOneBy({
		id: Number(id),
	});
	if (material) {
		AppDataSource.getRepository(Material).merge(material, newMaterial);
		const result = await AppDataSource.getRepository(Material).save(material);
	}
};

export const deleteMaterial = async (id: string): Promise<void> => {
	const materialRepo = AppDataSource.getRepository(Material);
	await materialRepo.delete(id);
};
