import { View, Text } from 'native-base';
import styles from './chatItem.css';
import { TouchableOpacity } from 'react-native';

interface IPropsChatItem {
	name: string;
	onPressHandler: () => void;
}

const ChatItem = ({ name, onPressHandler }: IPropsChatItem) => {
	return (
		<TouchableOpacity style={styles.chatPicker} onPress={onPressHandler}>
			<Text style={styles.chatName}>{name}</Text>
		</TouchableOpacity>
	);
};

export default ChatItem;
