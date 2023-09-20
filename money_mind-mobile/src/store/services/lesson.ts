import { api } from '../services/index';
import { ILesson } from '../../interfaces/ILesson';

const lessonApi = api.injectEndpoints({
	endpoints: (build) => ({
		getLesson: build.query<ILesson[], void>({
			query: () => '/lesson',
			providesTags: () => [{ type: 'Lesson', id: 'LIST' }],
		}),
		createLesson: build.mutation<ILesson, string>({
			query: (post) => ({
				url: '/lesson',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Lesson'],
		}),
		updateLesson: build.mutation<ILesson, string>({
			query: (id) => ({
				url: '/lesson/' + id,
				method: 'PATCH',
			}),
			invalidatesTags: ['Lesson'],
		}),
		deleteLesson: build.mutation<void, string>({
			query: (id) => ({
				url: `/lesson/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Lesson'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetLessonQuery,
	useCreateLessonMutation,
	useUpdateLessonMutation,
	useDeleteLessonMutation,
} = lessonApi;
