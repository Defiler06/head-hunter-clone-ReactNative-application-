import { NativeBaseProvider, Stack, Text, View } from 'native-base';
import { styles } from './ShowChats.css';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import Logo from '../../assets/images/logo.png';
import ChatItem from '../../components/ChatItem/chatItem';
import { useGetActivityQuery } from '../../store/services/activity';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';
import { useGetChatsQuery } from '../../store/services/chat';

const ShowChat = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const { data: chats } = useGetChatsQuery();
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const renderChatItems = chats?.map((element) => {
		return (
			<ChatItem
				name={element.chat}
				key={element.id}
				onPressHandler={() => navigation.navigate('Chat', { id: element.id })}
			/>
		);
	});

	return (
		<NativeBaseProvider>
			<InternetWarning
				open={!isConnected}
				error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
			/>
			<View style={styles.background}>
				<View style={styles.header}>
					<View alignItems="flex-start" width="90%">
						<ButtonGoBack
							blackText={true}
							onPressHandler={() => navigation.goBack()}
						/>
					</View>
				</View>
				<Stack width="100%" space={10} top="4%">
					<Stack alignItems="center" width="100%" space={5}>
						<Text style={styles.title}>Выберите свой чат</Text>
						<ImageBackground
							resizeMode="contain"
							style={styles.logo}
							source={Logo as ImageSourcePropType}
						/>
					</Stack>
					<Stack space={5}>{renderChatItems}</Stack>
				</Stack>
			</View>
		</NativeBaseProvider>
	);
};

export default ShowChat;
