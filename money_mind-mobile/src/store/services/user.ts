import { api } from './index';
import { IUserInfo } from '../../interfaces/IUserInfo';

const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserInfoByToken: build.query<IUserInfo[], void>({
			query: () => '/user',
			providesTags: () => [{ type: 'User', id: 'LIST' }],
		}),
	}),
	overrideExisting: false,
});

export const { useGetUserInfoByTokenQuery } = userApi;
