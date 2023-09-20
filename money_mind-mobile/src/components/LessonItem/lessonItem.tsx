import { HStack, Stack, Text, View } from 'native-base';
import { styles } from './lessonItem.css';
import {
	ImageBackground,
	ImageSourcePropType,
	TouchableWithoutFeedback,
} from 'react-native';
import lessonItem from '../../assets/images/lessonItem.png';
interface IPropsLessonItem {
	order: number;
	lessonName: string;
	isActived: boolean;
	isPassed: boolean;
	isChecked: boolean;
	clickOpen: () => void;
}

const LessonItem = ({
	order,
	lessonName,
	isActived,
	isPassed,
	isChecked,
	clickOpen,
}: IPropsLessonItem) => {
	return (
		<HStack style={order % 2 === 0 ? styles.left : styles.right}>
			<Stack space={5} alignItems="center" justifyContent="center" height={150}>
				<View
					style={
						isActived && isPassed
							? styles.lessonItemDone
							: isActived
							? styles.lessonItemActive
							: styles.lessonItemNotActive
					}
				>
					<ImageBackground
						source={lessonItem as ImageSourcePropType}
						style={styles.lessonItemBackground}
						resizeMode={'cover'}
					>
						<TouchableWithoutFeedback disabled={!isActived} onPress={clickOpen}>
							<Text
								style={
									isActived ? styles.lessonOrderActive : styles.lessonOrderDone
								}
							>
								{order}
							</Text>
						</TouchableWithoutFeedback>
					</ImageBackground>
				</View>
				<View style={styles.transparentBlock}>
					<Text style={styles.lessonName}>{lessonName}</Text>
				</View>
			</Stack>
		</HStack>
	);
};

export default LessonItem;
