import { Stack, Text, View } from 'native-base';
import { styles } from './Message.css';
import { ImageBackground } from 'react-native';
import { uri } from '../../constants/config';

interface IPropsMessage {
	displayName: string;
	message: string;
	image: string;
	byUser: boolean | undefined;
}
const Message = ({ displayName, message, image, byUser }: IPropsMessage) => {
	return (
		<Stack
			width="95%"
			alignItems="flex-end"
			flexDirection="row"
			justifyContent="center"
		>
			<View style={styles.message}>
				<Stack style={styles.messageBody}>
					<Text style={byUser ? styles.byUser : styles.author}>
						{displayName}
					</Text>
					<Text style={styles.messageContent}>{message}</Text>
				</Stack>
			</View>
			<View width="10%" justifyContent="center">
				<View style={styles.profileImage}>
					<Text style={styles.name}>{image}</Text>
				</View>
			</View>
		</Stack>
	);
};

export default Message;
