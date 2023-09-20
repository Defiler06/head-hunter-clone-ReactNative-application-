import { api } from './index';
import { IUser } from '../../interfaces/IUser';
import { UserForm } from '../../interfaces/UserForm';
import { IUpdateUser } from '../../interfaces/IUpdateUser';

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation<IUser, UserForm>({
			query: (body) => ({
				url: '/signup',
				method: 'post',
				body,
			}),
		}),
		signIn: build.mutation<IUser, UserForm>({
			query: (body) => ({
				url: '/signin',
				method: 'post',
				body,
			}),
		}),
		userInfo: build.mutation<IUser, IUpdateUser>({
			query: (body) => ({
				url: '/user-info',
				method: 'post',
				body,
			}),
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation, useUserInfoMutation } =
	authApi;

export default authApi;
