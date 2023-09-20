import { Input } from 'native-base';

interface IPropsInputMail {
	value: string;
	onInputHandler: (text: string) => void;
}
const InputMail = ({ value, onInputHandler }: IPropsInputMail) => {
	return (
		<Input
			value={value}
			onChangeText={onInputHandler}
			variant="underlined"
			placeholder="Почта"
			w={{ base: '80%', md: '25%' }}
			borderBottomColor="white"
			size="xl"
			placeholderTextColor="white"
			fontFamily="zlusa-font"
			fontSize={45}
			color="white"
		/>
	);
};

export default InputMail;
