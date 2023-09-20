import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	closeBtn: {
		backgroundColor: 'none',
		flex: 1,
		left: '100%',
		padding: 10,
		position: 'absolute',
		zIndex: 100,
	},
	closeTextBtn: {
		color: 'black',
		fontFamily: 'web-font',
		fontSize: 40,
	},
	contentTextModal: {
		alignSelf: 'center',
		fontFamily: 'web-font',
		fontSize: 30,
		textAlign: 'center',
	},
	imageBackground: {
		flex: 1,
	},
	modalBody: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContent: {
		minHeight: 170,
		minWidth: 325,
	},
	modalFooter: {
		backgroundColor: 'none',
		borderTopWidth: 0,
	},
	modalHeader: {
		backgroundColor: 'none',
		borderBottomWidth: 0,
		justifyContent: 'center',
		margin: 15,
	},
});
