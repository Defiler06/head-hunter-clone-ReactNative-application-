import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 8,
		elevation: 4,
		flexDirection: 'row',
		marginHorizontal: 16,
		marginVertical: 8,
		paddingLeft: 8,
	},
	description: {
		color: '#666',
		fontSize: 14,
		marginBottom: 4,
	},
	image: {
		borderRadius: 8,
		height: 100,
		width: 100,
	},
	imageCoin: {
		height: 20,
		width: 20,
	},
	infoContainer: {
		flex: 1,
		padding: 12,
	},
	price: {
		color: '#009688',
		fontSize: 16,
		fontWeight: 'bold',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
});
