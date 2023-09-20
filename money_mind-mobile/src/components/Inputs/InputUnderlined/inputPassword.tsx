import { Input, Pressable } from 'native-base';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IPropsInputPassword {
	value: string;
	onInputHandler: (text: string) => void;
}

const InputPassword = ({ value, onInputHandler }: IPropsInputPassword) => {
	const [show, setShow] = useState<boolean>(false);

	return (
		<Input
			onChangeText={onInputHandler}
			value={value}
			variant="underlined"
			placeholder="Пароль"
			w={{ base: '80%', md: '25%' }}
			borderBottomColor="white"
			placeholderTextColor="white"
			fontFamily="zlusa-font"
			fontSize={45}
			color="white"
			textAlignVertical={'center'}
			type={show ? 'text' : 'password'}
			InputRightElement={
				<Pressable onPress={() => setShow(!show)}>
					<Icon
						name={show ? 'visibility' : 'visibility-off'}
						size={25}
						color="white"
					/>
				</Pressable>
			}
		/>
	);
};

export default InputPassword;
