import { api } from '../services/index';
import { IActivity } from '../../interfaces/IActivity';

const activityApi = api.injectEndpoints({
	endpoints: (build) => ({
		getActivity: build.query<IActivity[], void>({
			query: () => '/activities',
			providesTags: () => [{ type: 'Activity', id: 'LIST' }],
		}),
		createActivity: build.mutation<IActivity, string>({
			query: (post) => ({
				url: '/activities',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Activity'],
		}),
		updateActivity: build.mutation<IActivity, string>({
			query: (id) => ({
				url: '/activities/' + id,
				method: 'PATCH',
			}),
			invalidatesTags: ['Activity'],
		}),
		deleteActivity: build.mutation<void, string>({
			query: (id) => ({
				url: `/activities/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Activity'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetActivityQuery,
	useCreateActivityMutation,
	useUpdateActivityMutation,
	useDeleteActivityMutation,
} = activityApi;
