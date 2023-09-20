import { Button, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import { styles } from './menuItem.css';
import { ImageSourcePropType } from 'react-native';
import menuItem from '../../assets/images/menuItem.png';

interface IPropsMenuItem {
	pathToIcon: ImageSourcePropType;
	onPressHandler: () => void;
	textButton: string;
}

const MenuItem = ({
	pathToIcon,
	onPressHandler,
	textButton,
}: IPropsMenuItem) => {
	return (
		<Button variant="unstyled" onPress={onPressHandler}>
			<ImageBackground
				source={menuItem as ImageSourcePropType}
				style={styles.imageBackground}
			>
				<ImageBackground
					source={pathToIcon}
					resizeMode="contain"
					style={styles.itemBackground}
				/>
				<Text style={styles.textBtn}>{textButton}</Text>
			</ImageBackground>
		</Button>
	);
};

export default MenuItem;
