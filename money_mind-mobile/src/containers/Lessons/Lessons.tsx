import { HStack, NativeBaseProvider, Stack } from 'native-base';
import { ImageBackground, ImageSourcePropType, ScrollView } from 'react-native';
import LessonItem from '../../components/LessonItem/lessonItem';
import { useState, useEffect } from 'react';
import { styles } from './Lesson.css';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import backgroundLessons from '../../assets/images/backgroundLessons.png';
import { 
	useGetEducationUserQuery,
} from '../../store/services/education';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';
import { IEducation } from '../../interfaces/IEducation';

const Lessons = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const { data: educations } = useGetEducationUserQuery();
	const [isConnected, setIsConnected] = useState<boolean | null>(true);
 
	
	const renderItems = educations?.map((element: IEducation) => {
		return (
			<LessonItem
				key={element.id}
				lessonName={element.lesson.title}
				order={element.lesson.nord}
				isActived={element.isActive}
				isPassed={element.isPassed}
				isChecked={element.checked}
				clickOpen={() =>
					navigation.navigate('Course', { id: element.lesson.id })
				}
			/>
		);
	});

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
			<ScrollView
				contentContainerStyle={styles.contentStyle}
				showsVerticalScrollIndicator={false}
			>
				<ImageBackground
					source={backgroundLessons as ImageSourcePropType}
					style={styles.imageBackground}
					resizeMode="cover"
				>
					<InternetWarning
						open={!isConnected}
						error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
					/>
					<HStack justifyContent="flex-start" width="90%">
						<ButtonGoBack onPressHandler={() => navigation.goBack()} />
					</HStack>
					<Stack style={styles.stack}>{renderItems}</Stack>
				</ImageBackground>
			</ScrollView>
		</NativeBaseProvider>
	);
};

export default Lessons;
