import Constants from 'expo-constants';

const { manifest } = Constants;
export const uri = `http://${manifest?.debuggerHost?.split(':').shift()}:3001`;

export const socketUri = `http://${manifest?.debuggerHost
	?.split(':')
	.shift()}:3002`;
