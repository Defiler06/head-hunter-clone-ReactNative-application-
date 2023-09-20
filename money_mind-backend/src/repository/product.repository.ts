import { IProduct } from '@src/interfaces/IProduct';
import { AppDataSource } from '../data-source';
import { Product } from '@src/entity/Product';

export const getProducts = async (): Promise<Product[]> => {
	const product = AppDataSource.getRepository(Product);
	const allRecords = await product.find();
	return allRecords;
};

export const createProduct = async (newProduct: IProduct): Promise<void> => {
	const product = AppDataSource.getRepository(Product).create(newProduct);
	const results = await AppDataSource.getRepository(Product).save(product);
};

export const changeProduct = async (
	id: string,
	updateProduct: IProduct,
): Promise<void> => {
	const product = await AppDataSource.getRepository(Product).findOneBy({
		id: Number(id),
	});
	if (product instanceof Product) {
		AppDataSource.getRepository(Product).merge(product, updateProduct);
		const results = await AppDataSource.getRepository(Product).save(product);
	}
};

export const deleteProduct = async (id: string): Promise<void> => {
	const results = await AppDataSource.getRepository(Product).delete(Number(id));
};

export const getProductById = async (id: string): Promise<Product> => {
	const product = AppDataSource.getRepository(Product);
	const result = await product.findOneBy({ id: Number(id) });
	if (result === null) {
		throw new Error('Продукт не найден');
	} else {
		return result;
	}
};
