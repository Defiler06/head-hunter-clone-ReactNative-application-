import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	author: {
		fontFamily: 'web-font',
		fontSize: 30,
	},
	background: {
		backgroundColor: '#5DABCD',
		height: '100%',
		justifyContent: 'space-between',
	},
	buttonTitle: {
		fontFamily: 'roboto',
		fontSize: 40,
		lineHeight: 40,
	},
	footer: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		height: 100,
		justifyContent: 'center',
	},
	header: {
		alignItems: 'center',
		backgroundColor: 'white',
		height: 120,
		justifyContent: 'center',
	},
	imageProfile: {
		flex: 1,
		height: 105,
		width: 35,
	},
	message: {
		alignItems: 'flex-start',
		backgroundColor: 'white',
		borderColor: 'black',
		borderWidth: 2,
		justifyContent: 'center',
		marginTop: '2%',
		minHeight: 100,
		whiteSpace: 'normal',
		width: '90%',
	},
	messageBody: {
		padding: 20,
	},
	messageContent: {
		fontFamily: 'web-font',
		fontSize: 30,
		lineHeight: 50,
		marginTop: 5,
	},
	profileImage: {
		alignItems: 'center',
		backgroundColor: '#E3C768',
		borderColor: 'white',
		borderRadius: 100,
		borderWidth: 2,
		height: 50,
		justifyContent: 'center',
		marginTop: '2%',
		overflow: 'hidden',
		padding: 5,
		width: 50,
	},
	titleName: {
		fontFamily: 'web-font',
		fontSize: 40,
		lineHeight: 25,
		marginTop: '15%',
	},
});
