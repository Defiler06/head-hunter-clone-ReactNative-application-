import {
	NativeBaseProvider,
	Stack,
	Text,
	Button,
	Image,
	HStack,
} from 'native-base';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import {
	NavigationProp,
	ParamListBase,
	RouteProp,
} from '@react-navigation/core';
import { useEffect, useState } from 'react';
import { styles } from './Lesson.css';
import { useGetLessonQuery } from '../../store/services/lesson';
import { RootStackParamList } from '../../Routes';
import NetInfo from '@react-native-community/netinfo';

type LessonScreenNavigationProp = NavigationProp<RootStackParamList>;
type LessonScreenRouteProp = RouteProp<RootStackParamList, 'Lesson'>;

import backgroundLessons from '../../assets/images/lesson_bg.png';
import avatar from '../../assets/images/avatar.png';
import btn from '../../assets/images/button_pass.png';
import txt from '../../assets/images/text.png';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';

const Lesson = ({
	navigation,
	route,
}: {
	navigation: LessonScreenNavigationProp;
	route: LessonScreenRouteProp;
}) => {
	const { data: lessons } = useGetLessonQuery();

	const [textPresent, settextPresent] = useState('');
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	const speed = 10;
	let text = '';
	let i = 0;

	const typeWriter = (txt: string) => {
		if (i < txt.length) {
			text += txt.charAt(i);
			settextPresent(text);
			i++;
			setTimeout(() => typeWriter(txt), speed);
		}
	};

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);
		});

		if (lessons) {
			const index = lessons.findIndex(
				(lesson) => lesson.id === route.params.id,
			);
			typeWriter(lessons[index].text);
		}

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<NativeBaseProvider>
			<ImageBackground
				source={backgroundLessons as ImageSourcePropType}
				style={styles.imageBackground}
			>
				<InternetWarning
					open={!isConnected}
					error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
				/>
				<HStack justifyContent="flex-start" width="90%">
					<ButtonGoBack onPressHandler={() => navigation.goBack()} />
				</HStack>

				<Stack style={styles.stackInfo}>
					<ImageBackground
						source={txt as ImageSourcePropType}
						style={styles.textBg}
					>
						<Text style={styles.textInfo}>{textPresent}</Text>
					</ImageBackground>
				</Stack>

				<Stack style={styles.stackAvatar}>
					<Image
						source={avatar as ImageSourcePropType}
						alt={'test'}
						style={styles.avatar}
					/>
				</Stack>
				<Button
					style={styles.sbmBtn}
					onPress={() =>
						navigation.navigate('Answers', { id: route.params.id })
					}
				>
					<Image source={btn as ImageSourcePropType} alt={'test'} />
				</Button>
			</ImageBackground>
		</NativeBaseProvider>
	);
};

export default Lesson;
