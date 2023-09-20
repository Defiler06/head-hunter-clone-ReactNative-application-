import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	answerStack: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
		height: 200,
		justifyContent: 'center',
		margin: 12,
		marginTop: 150,
		width: '90%',
	},
	buttonTask: {
		backgroundColor: 'rgba(28,28,28,0)',
		marginTop: 10,
	},
	container: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		width: '100%',
	},
	description: {
		backgroundColor: 'white',
		borderBottomWidth: 5,
		borderTopWidth: 5,
		opacity: 0.7,
		padding: 20,
	},
	form: {
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		justifyContent: 'space-evenly',
		width: '90%',
	},
	inputText: {
		alignItems: 'center',
		paddingBottom: 30,
	},
	text: {
		color: 'black',
		fontFamily: 'web-font',
		fontSize: 30,
		lineHeight: 30,
		paddingLeft: 20,
		textAlign: 'center',
	},
	textArea: {
		fontSize: 20,
		padding: 30,
	},
	textTitle: {
		color: 'black',
		fontFamily: 'web-font',
		fontSize: 30,
		lineHeight: 30,
		paddingLeft: 20,
		textAlign: 'center',
	},
});

export default styles;
