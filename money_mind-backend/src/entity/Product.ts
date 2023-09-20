import { IProduct } from '@src/interfaces/IProduct';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product implements IProduct {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
	})
	title: string;

	@Column({
		nullable: false,
	})
	description: string;

	@Column({
		nullable: false,
	})
	price: number;

	@Column({
		nullable: true,
	})
	image: string;
}
