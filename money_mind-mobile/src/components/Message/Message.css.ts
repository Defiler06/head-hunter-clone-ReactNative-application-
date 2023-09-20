import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	author: {
		color: 'black',
		fontFamily: 'roboto',
		fontSize: 20,
	},
	byUser: {
		color: '#009A6C',
		fontFamily: 'roboto',
		fontSize: 20,
	},
	message: {
		alignItems: 'flex-start',
		backgroundColor: '#e1e8f0',
		borderColor: 'black',
		borderRadius: 20,
		justifyContent: 'center',
		marginTop: '2%',
		minHeight: 30,
		paddingHorizontal: 15,
		paddingVertical: 10,
		whiteSpace: 'normal',
		width: '85%',
	},
	messageBody: {
		padding: 5,
	},
	messageContent: {
		fontFamily: 'roboto',
		fontSize: 20,
		lineHeight: 30,
		margin: 0,
	},
	name: {
		fontFamily: 'roboto',
		fontSize: 20,
	},
	profileImage: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderColor: 'white',
		borderRadius: 100,
		borderWidth: 1,
		height: 50,
		justifyContent: 'center',
		marginLeft: 10,
		overflow: 'hidden',
		padding: 5,
		width: 50,
	},
});
