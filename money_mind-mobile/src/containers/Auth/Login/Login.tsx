import {
	Backdrop,
	Button,
	KeyboardAvoidingView,
	NativeBaseProvider,
	Stack,
	Text,
} from 'native-base';
import { useEffect, useRef, useState } from 'react';
import {
	Animated,
	EmitterSubscription,
	ImageBackground,
	ImageSourcePropType,
	Keyboard,
	Platform,
} from 'react-native';
import InputMail from '../../../components/Inputs/InputUnderlined/inputMail';
import InputPassword from '../../../components/Inputs/InputUnderlined/inputPassword';
import NavigateButton from '../../../components/NavigateButton/navigateButton';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { useSignInMutation } from '../../../store/services/auth';
import { CustomError } from '../../../interfaces/errors/CustomError';
import ModalWindow from '../../../components/UI/ModalWindow/modalWindow';
import { styles } from './Login.css';
import Background from '../../../assets/images/background.png';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../../components/UI/InternetWarning/InternetWarning'; 

const Login = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
	const [isConnected, setIsConnected] = useState<boolean | null>(true);
	const valueOpacity: Animated.Value = useRef(new Animated.Value(100)).current;

	const [email, setMail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [signIn, { error, isError }] = useSignInMutation();
	const [open, setOpen] = useState(false);
	const [field, setField] = useState(false);
 

	const submitHandler = async () => {
		if (email.trim() === '' || password.trim() === '') {
			setField(true);
			setOpen(true);
			return;
		}

		const data = await signIn({
			email: email.toLowerCase(),
			password: password,
		});
	
		
		if (!(data as { error: object }).error) {
			setMail('');
			setPassword('');
			navigation.navigate('CreateAvatar');
		}
	};

	useEffect(() => {
		const showSubscription: EmitterSubscription = Keyboard.addListener(
			'keyboardDidShow',
			(): void => {
				setKeyboardStatus(true);
				Animated.timing(valueOpacity, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}).start();
			},
		);

		const hideSubscription: EmitterSubscription = Keyboard.addListener(
			'keyboardDidHide',
			(): void => {
				setKeyboardStatus(false);
				Animated.timing(valueOpacity, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}).start();
			},
		);

		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);
		});

		return (): void => {
			unsubscribe();
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	useEffect(() => {
		setField(false);
		setOpen(isError);
	}, [isError]);

	return (
		<NativeBaseProvider>
			<ImageBackground
				source={Background as ImageSourcePropType}
				style={styles.imageBackground}
			>
				{keyboardStatus ? <Backdrop /> : null}
				<KeyboardAvoidingView
					behavior="position"
					w={{ base: '100%' }}
					flex={1}
					zIndex={100}
				>
					<InternetWarning
						open={!isConnected}
						error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
					/>
					<ModalWindow
						onClose={() => setOpen(false)}
						open={open}
						keyboardStatus={keyboardStatus}
						error={
							!field
								? (error as CustomError)?.data?.error
								: 'Все поля обязательные'
						}
					/>
					<Stack
						space={4}
						w="100%"
						alignItems="center"
						top={Platform.OS === 'android' ? '110%' : '118%'}
					>
						<Animated.Text
							style={{
								opacity: valueOpacity,
								bottom: '39%',
								fontSize: 70,
								color: 'white',
								fontFamily: 'web-font',
							}}
						>
							Авторизация
						</Animated.Text>
						<Stack space={6} w="100%" alignItems="center">
							<InputMail
								value={email}
								onInputHandler={(mail: string) => setMail(mail)}
							/>
							<InputPassword
								value={password}
								onInputHandler={(password: string) => setPassword(password)}
							/>
							<Button
								w={{ base: '80%', md: '25%' }}
								borderRadius="30"
								backgroundColor="white"
								size="lg"
								onPress={submitHandler}
							>
								<Text style={styles.textBtn}>Войти</Text>
							</Button>
							<NavigateButton
								login={true}
								onPressHandler={() => navigation.navigate('Register')}
							/>
						</Stack>
					</Stack>
				</KeyboardAvoidingView>
			</ImageBackground>
		</NativeBaseProvider>
	);
};

export default Login;
