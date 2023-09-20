import { Image, Stack, Input } from 'native-base';
import styles from './inputName.css';
import inputNameBackground from '../../../assets/images/inputNameBackground.png';
import { ImageBackground, ImageSourcePropType } from 'react-native';

interface IPropsInputMail {
	value: string;
	onInputHandler: (text: string) => void;
}

const InputName = ({ value, onInputHandler }: IPropsInputMail) => {
	return (
		<Stack style={styles.stack}>
			<ImageBackground
				source={inputNameBackground as ImageSourcePropType}
				style={styles.image}
			>
				<Input
					value={value}
					onChangeText={onInputHandler}
					placeholder="Введите ваше имя"
					w={{ base: '80%', md: '25%' }}
					size="xl"
					placeholderTextColor="black"
					fontFamily="web-font"
					fontSize="30"
					textAlign="center"
					borderColor="rgba(28,28,28,0)"
					variant="unstyled"
				/>
			</ImageBackground>
		</Stack>
	);
};

export default InputName;
