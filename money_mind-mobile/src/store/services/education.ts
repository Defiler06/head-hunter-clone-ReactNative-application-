import { api } from '../services/index';
import { IEducation } from '../../interfaces/IEducation';

const educationApi = api.injectEndpoints({
	endpoints: (build) => ({
		getEducation: build.query<IEducation[], void>({
			query: () => '/education',
			providesTags: () => [{ type: 'Education', id: 'LIST' }],
		}),
		getEducationUser: build.query<IEducation[], void>({
			query: () => '/education/user-educations',
			providesTags: () => [{ type: 'Education', id: 'LIST' }],
		}),
		createEducation: build.mutation<IEducation, string>({
			query: (post) => ({
				url: '/education',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Education'],
		}),
		updateEducation: build.mutation<IEducation, string>({
			query: (post) => ({
				url: `/education/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['Education'],
		}),
		deleteEducation: build.mutation<void, string>({
			query: (id) => ({
				url: `/lesson/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Education'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetEducationQuery,
	useCreateEducationMutation,
	useUpdateEducationMutation,
	useDeleteEducationMutation,
	useGetEducationUserQuery,
} = educationApi;
