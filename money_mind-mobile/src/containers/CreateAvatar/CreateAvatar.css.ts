import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	TextAvatar: {
		fontFamily: 'web-font',
		fontSize: 30,
		height: 40,
		padding: 10,
	},
	activity: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 30,
	},
	avatar: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	avatarStack: {
		alignItems: 'center',
		marginLeft: 25,
		marginRight: 25,
	},
	bgColorButton: {
		backgroundColor: 'rgba(28,28,28,0)',
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		width: '100%',
	},
	imageAvatar: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		resizeMode: 'contain',
	},
	imageInput: {
		alignItems: 'center',
		height: 50,
		justifyContent: 'center',
		width: 300,
	},
	input: {
		backgroundColor: 'rgba(28,28,28,0)',
		fontFamily: 'web-font',
		fontSize: 40,
		height: 40,
		paddingTop: 10,
		placeholderTextColor: 'black',
	},
	inputText: {
		alignItems: 'center',
		paddingBottom: 30,
	},
	stackImageAvatar: {
		alignItems: 'center',
		height: 250,
		padding: 50,
	},
	textTitle: {
		color: '#FFFFFF',
		fontFamily: 'web-font',
		fontSize: 50,
		lineHeight: 50,
		paddingBottom: 50,
		textAlign: 'center',
	},
});

export default styles;
