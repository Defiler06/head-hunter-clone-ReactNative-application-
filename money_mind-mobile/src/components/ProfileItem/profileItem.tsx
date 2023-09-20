import { Stack, Text } from 'native-base';
import { styles } from './profileItem.css';

interface IPropsProfileItem {
	title: string;
	subtitle: string | undefined;
}

const ProfileItem = ({ title, subtitle }: IPropsProfileItem) => {
	return (
		<Stack space={2}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</Stack>
	);
};

export default ProfileItem;
