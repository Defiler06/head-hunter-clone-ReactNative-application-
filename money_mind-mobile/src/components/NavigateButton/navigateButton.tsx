import { Button, Stack, Text } from 'native-base';
import { styles } from './navigateButton.css';

interface IPropsNavigateButton {
	login: boolean;
	onPressHandler: () => void;
}

const NavigateButton = ({ login, onPressHandler }: IPropsNavigateButton) => {
	return (
		<Stack space={6} w="100%" alignItems="center">
			<Text style={styles.titleNavigation}>
				{!login ? 'Уже есть аккаунт?' : 'еще нет аккаунта?'}
			</Text>
			<Button
				w={{ base: '40%', md: '25%' }}
				borderRadius="30"
				backgroundColor="white"
				size="xs"
				onPress={onPressHandler}
			>
				<Text style={styles.titleButton}>{login ? 'Создать' : 'Войти'}</Text>
			</Button>
		</Stack>
	);
};

export default NavigateButton;
