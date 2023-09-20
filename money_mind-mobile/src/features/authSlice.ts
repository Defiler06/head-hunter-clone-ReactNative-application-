import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';
import authApi from '../store/services/auth';

interface State {
	user: IUser | null;
}
const initialState: State = {
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				authApi.endpoints.signUp.matchFulfilled,
				(state, action: PayloadAction<IUser>) => {
					state.user = action.payload;
				},
			)
			.addMatcher(
				authApi.endpoints.signIn.matchFulfilled,
				(state, action: PayloadAction<IUser>) => {
					state.user = action.payload;
				},
			);
	},
});
export default authSlice.reducer;
