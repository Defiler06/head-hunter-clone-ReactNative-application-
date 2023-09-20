import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	contentTextModal: {
		alignSelf: 'center',
		fontFamily: 'web-font',
		fontSize: 30,
		textAlign: 'center',
	},
	modalBody: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContent: {
		alignItems: 'center',
		justifyContent: 'center',
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
	},
});
