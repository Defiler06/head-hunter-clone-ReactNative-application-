import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { uri } from '../../constants/config';

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: uri,
		prepareHeaders: (headers, { getState }) => {
			const state: RootState = getState();
			const token = state.auth.user?.accessToken as string; 
			console.log(token);
			
			if (token) {
				headers.set('Authorization', token);
			}
		},
	}) as BaseQueryFn<
		string | FetchArgs,
		unknown,
		FetchBaseQueryError | { error: object },
		object,
		FetchBaseQueryMeta
	>,
	endpoints: () => ({}),
	tagTypes: [
		'Activity',
		'Avatar',
		'User',
		'Lesson',
		'Education',
		'Product',
		'Chat',
	],
});
