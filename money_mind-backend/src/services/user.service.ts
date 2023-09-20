import * as userRepository from '@src/repository/user.repository';
import { IUser } from '@src/interfaces/IUser';

export const signIn = (userData: IUser) => {
	return userRepository.signIn(userData);
};

export const signUp = (userData: IUser) => {
	return userRepository.signUp(userData);
};
