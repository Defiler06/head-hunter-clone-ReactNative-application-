import { api } from '../services/index';
import { IProduct } from '../../interfaces/IProduct';

const productApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<IProduct[], void>({
			query: () => '/product',
			providesTags: () => [{ type: 'Product', id: 'LIST' }],
		}),
		createProduct: build.mutation<IProduct, string>({
			query: (post) => ({
				url: '/product',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Product'],
		}),
		updateProduct: build.mutation<IProduct, string>({
			query: (id) => ({
				url: '/product/' + id,
				method: 'PATCH',
			}),
			invalidatesTags: ['Product'],
		}),
		deleteProduct: build.mutation<void, string>({
			query: (id) => ({
				url: `/product/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Product'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = productApi;
