import React, { useEffect, useState } from 'react';
import {
	Backdrop,
	Button,
	HStack,
	Image,
	KeyboardAvoidingView,
	NativeBaseProvider,
	Stack,
	Text,
	TextArea,
} from 'native-base';
import {
	ImageBackground,
	ImageSourcePropType,
	Keyboard,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/core';
import styles from './Answers.css';
import bgImage from '../../assets/images/lesson_bg.png';
import createButton from '../../assets/images/button_pass.png';
import { useGetLessonQuery } from '../../store/services/lesson';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import { RootStackParamList } from '../../Routes';
import {
	useGetEducationUserQuery,
	useUpdateEducationMutation,
} from '../../store/services/education';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';
import ModalWindow from '../../components/UI/ModalWindow/modalWindow';

type AnswersScreenNavigationProp = NavigationProp<RootStackParamList>;
type AnswersScreenRouteProp = RouteProp<RootStackParamList, 'Answers'>;

const Answers = ({
	navigation,
	route,
}: {
	navigation: AnswersScreenNavigationProp;
	route: AnswersScreenRouteProp;
}) => {
	const { data: lessons } = useGetLessonQuery();
	const { data: educations } = useGetEducationUserQuery();
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [answer, setAnswer] = useState<string>('');
	const [educationUpdate, { isLoading }] = useUpdateEducationMutation();
	const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const [field, setField] = useState(false);
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	useEffect(() => {
		if (lessons) {
			const index = lessons.findIndex(
				(lesson) => lesson.id === route.params.id,
			);
			setText(lessons[index].homework);
			setTitle(lessons[index].title);
		}
	}, []);

	const submitHandler = async () => {
		if (answer.trim() === '') {
			setField(true);
			setOpen(true);
			return;
		}

		const i = educations.findIndex(
			(education) => education.lesson.id === route.params.id,
		);

		console.log(educations);

		const passedEducation = educations[i];
		passedEducation.isPassed = true;
		passedEducation.text_homework = answer;
		await educationUpdate(passedEducation);
		setAnswer('');

		const updatedIndex = educations.findIndex(
			(education) => education.lesson.nord === educations[i].lesson.nord + 1,
		);

		const updatedEducation = educations[updatedIndex];
		if (updatedEducation) {
			updatedEducation.isActive = true;
			await educationUpdate(updatedEducation);
		}
		navigation.navigate('Lessons');
	};

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<NativeBaseProvider>
			<ImageBackground
				source={bgImage as ImageSourcePropType}
				resizeMode="cover"
				style={styles.container}
			>
				<ModalWindow
					onClose={() => setOpen(false)}
					open={open}
					keyboardStatus={keyboardStatus}
					error={!field ? 'Что-то пошло не так' : 'Отчет не может быть пустым!'}
				/>
				<InternetWarning
					open={!isConnected}
					error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
				/>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container}>
						<HStack justifyContent="flex-start" width="90%">
							<ButtonGoBack onPressHandler={() => navigation.goBack()} />
						</HStack>
						<Stack style={styles.description}>
							<Text style={styles.textTitle}>{title}</Text>
							<Text style={styles.text}>{text}</Text>
						</Stack>
						<KeyboardAvoidingView
							marginTop={5}
							behavior="padding"
							w={{ base: '100%' }}
							flex={1}
							zIndex={100}
							alignItems="center"
						>
							<Stack style={styles.form}>
								<TextArea
									style={styles.textArea}
									borderWidth={0}
									backgroundColor={'white'}
									multiline={true}
									value={answer}
									w="100%"
									h={'50%'}
									onChangeText={(answer: string) => setAnswer(answer)}
									placeholder="Напишите свой отчет здесь"
									autoCompleteType={undefined}
								/>
								<Button style={styles.buttonTask} onPress={submitHandler}>
									<Image
										source={createButton as ImageSourcePropType}
										alt={'submit'}
									/>
								</Button>
							</Stack>
						</KeyboardAvoidingView>
					</View>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</NativeBaseProvider>
	);
};
export default Answers;
