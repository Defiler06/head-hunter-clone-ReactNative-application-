import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	left: {
		justifyContent: 'flex-start',
	},
	lessonItemActive: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 80,
		height: 120,
		justifyContent: 'center',
		width: 120,
	},
	lessonItemBackground: {
		alignItems: 'center',
		height: 165,
		justifyContent: 'center',
		width: 165,
	},
	lessonItemDone: {
		alignItems: 'center',
		backgroundColor: '#64B68A',
		borderRadius: 80,
		height: 120,
		justifyContent: 'center',
		width: 120,
	},
	lessonItemNotActive: {
		alignItems: 'center',
		backgroundColor: '#A3A3A3',
		borderRadius: 80,
		height: 120,
		justifyContent: 'center',
		width: 120,
	},
	lessonName: {
		color: 'white',
		fontFamily: 'web-font',
		fontSize: 25,
	},
	lessonOrderActive: {
		color: 'black',
		fontFamily: '3997-font',
		fontSize: 40,
		lineHeight: 40,
		textAlign: 'center',
	},
	lessonOrderDone: {
		color: 'white',
		fontFamily: '3997-font',
		fontSize: 40,
		lineHeight: 40,
		textAlign: 'center',
	},
	right: {
		justifyContent: 'flex-end',
	},
	transparentBlock: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 10,
		justifyContent: 'center',
		padding: 10,
	},
});
