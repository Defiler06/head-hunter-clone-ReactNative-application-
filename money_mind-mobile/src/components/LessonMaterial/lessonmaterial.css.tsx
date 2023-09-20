import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	flexset: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		width: '100%',
		height: '100%',
	},
	titlelesson: {
		marginTop: '5%',
		marginBottom: '5%',
		padding: '5%',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.27)',
	},
	titletextlesson: {
		fontSize: 35,
		color: 'white',
		fontFamily: 'web-font',
	},

	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	video: {
		alignSelf: 'center',
		width: 430,
		height: 270,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	textlesson: {
		flex: 1,
		alignItems: 'center',
		borderColor: 'grey',
		borderTopWidth: 4,
		borderBottomWidth: 4,
		marginBottom: '5%',
	},
	textlessontext: {
		padding: '4%',
		fontSize: 30,

		fontFamily: 'web-font',
	},

	btnlesson: {
		flex: 1,
	},
	textbtn: {
		fontSize: 30,
		color: 'white',
		fontFamily: 'web-font',
	},
});
