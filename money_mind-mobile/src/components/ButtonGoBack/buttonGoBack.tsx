import { Button, Text } from 'native-base';
import { styles } from '../../containers/Profile/Profile.css';

interface IPropsButtonGoBack {
	onPressHandler: () => void;
	blackText?: boolean;
}
const ButtonGoBack = ({ onPressHandler, blackText }: IPropsButtonGoBack) => {
	return (
		<Button variant="unstyled" marginTop="15%" onPress={onPressHandler}>
			<Text style={blackText ? styles.headerTextBlack : styles.headerText}>
				{'< назад'}
			</Text>
		</Button>
	);
};

export default ButtonGoBack;
