import { api } from '../services/index';
import { IAvatar } from '../../interfaces/IAvatar';

const avatarApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAvatar: build.query<IAvatar[], void>({
			query: () => '/avatar',
			providesTags: () => [{ type: 'Avatar', id: 'LIST' }],
		}),
		createAvatar: build.mutation<IAvatar, string>({
			query: (post) => ({
				url: '/avatar',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Avatar'],
		}),
		updateAvatar: build.mutation<IAvatar, string>({
			query: (id) => ({
				url: '/avatar/' + id,
				method: 'PATCH',
			}),
			invalidatesTags: ['Avatar'],
		}),
		deleteAvatar: build.mutation<void, string>({
			query: (id) => ({
				url: `/avatar/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Avatar'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetAvatarQuery,
	useCreateAvatarMutation,
	useUpdateAvatarMutation,
	useDeleteAvatarMutation,
} = avatarApi;
