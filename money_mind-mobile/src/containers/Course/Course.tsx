import { HStack, NativeBaseProvider } from 'native-base';
import {
	NavigationProp,
	ParamListBase,
	RouteProp,
} from '@react-navigation/core';
import LessonMaterial from '../../components/LessonMaterial/lessonmaterial';
import { ImageBackground, ImageSourcePropType, View } from 'react-native';
import { styles } from './Course.css';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import { useGetLessonQuery } from '../../store/services/lesson';
import NetInfo from '@react-native-community/netinfo';
import { RootStackParamList } from '../../Routes';
import { useState, useEffect } from 'react';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';
import backgroundImage from '../../assets/images/backgroundLessonMaterial.png';

type CourseScreenNavigationProp = NavigationProp<RootStackParamList>;
type CourseScreenRouteProp = RouteProp<RootStackParamList, 'Course'>;

const Course = ({
	navigation,
	route,
}: {
	navigation: CourseScreenNavigationProp;
	route: CourseScreenRouteProp;
}) => {
	const { data: lessons } = useGetLessonQuery();
	const [shouldPlayOn, setShouldPlayOn] = useState<boolean>(true);
	const [isConnected, setIsConnected] = useState<boolean | null>(true);
	const press = (id: string) => {
		navigation.navigate('Lesson', { id: id });
		setShouldPlayOn(false);
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
				source={backgroundImage as ImageSourcePropType}
				style={styles.imageBackground}
			>
				<InternetWarning
					open={!isConnected}
					error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
				/>
				<View>
					<HStack space={'50%'} style={styles.hStack}>
						<ButtonGoBack onPressHandler={() => navigation.goBack()} />
					</HStack>
				</View>

				{lessons &&
					lessons
						.filter((lesson) => lesson.id === route.params.id)
						.map((lesson) => (
							<LessonMaterial
								key={lesson.id}
								play={shouldPlayOn}
								titletext={lesson.title}
								text={lesson.text}
								videolink={lesson.videolink}
								onPressHandler={() => {
									press(lesson.id);
								}}
							></LessonMaterial>
						))}
			</ImageBackground>
		</NativeBaseProvider>
	);
};

export default Course;
