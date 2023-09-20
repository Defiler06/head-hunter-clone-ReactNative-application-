import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	coinBox: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '15%',
		width: '18%',
	},
	hStack: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		backgroundColor: '#4872B9',
		height: '12%',
	},
	headerText: {
		color: 'white',
		fontFamily: 'web-font',
		fontSize: 40,
		lineHeight: 25,
	},
	headerTextBlack: {
		color: 'black',
		fontFamily: 'web-font',
		fontSize: 40,
		lineHeight: 25,
	},
	imageBackground: {
		flex: 1,
	},
	imageCoin: {
		height: 20,
		width: 20,
	},
	imageProfile: {
		flex: 1,
		height: 420,
		width: 140,
	},
	infoUser: {
		alignItems: 'flex-start',
		marginTop: '5%',
		width: '90%',
	},
	lineUnder: {
		borderBottomColor: 'black',
		borderRadius: 20,
		borderWidth: 2,
		width: '90%',
	},
	profileImage: {
		alignItems: 'center',
		backgroundColor: '#E3C768',
		borderColor: 'white',
		borderRadius: 100,
		borderWidth: 5,
		height: 200,
		justifyContent: 'center',
		overflow: 'hidden',
		padding: 20,
		width: 200,
	},
	profileName: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '10%',
	},
	profileUserName: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	progressBar: {
		backgroundColor: 'transparent',
		borderColor: '#0A6E75',
		borderRadius: 0,
		borderWidth: 4,
		height: 50,
		width: '110%',
	},
	userName: {
		color: 'white',
		fontFamily: 'web-font',
		fontSize: 75,
		lineHeight: 70,
	},
});
