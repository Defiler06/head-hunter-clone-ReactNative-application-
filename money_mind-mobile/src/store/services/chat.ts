import { api } from '../services/index';
import { IChat } from '../../interfaces/IChat';

const chatsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getChats: build.query<IChat[], void>({
			query: () => '/chat',
			providesTags: () => [{ type: 'Chat', id: 'LIST' }],
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatsQuery } = chatsApi;
