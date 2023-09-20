import {
	Button,
	FlatList,
	HStack,
	Input,
	KeyboardAvoidingView,
	NativeBaseProvider,
	Stack,
	Text,
	View,
} from 'native-base';
import { styles } from './Chat.css';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import { socketUri } from '../../constants/config';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useGetUserInfoByTokenQuery } from '../../store/services/user';
import { IMessage } from '../../interfaces/IMessage';
import Message from '../../components/Message/Message';
import { NavigationProp } from '@react-navigation/core';
import { RootStackParamList } from '../../Routes';
import { RouteProp } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';

type ChatScreenNavigationProp = NavigationProp<RootStackParamList>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const Chat = ({
	navigation,
	route,
}: {
	navigation: ChatScreenNavigationProp;
	route: ChatScreenRouteProp;
}) => {
	// const imageProfile = `${uri}/avatar/1-FYn02dWm7aLjByFLZID.png`;

	const { data: userInfo } = useGetUserInfoByTokenQuery();

	const [messages, setMessages] = useState<IMessage[]>([]);
	const [message, setMessage] = useState('');
	const [messageCount, setMessageCount] = useState(20);
	const [isFetching, setIsFetching] = useState(false);
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	const socketClient = useRef<Socket>();

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected);
		});

		socketClient.current = io(socketUri);

		socketClient.current.emit('join-chat', route.params.id);

		socketClient.current.emit('get-all-messages', {
			chatRoomId: route.params.id,
			size: 20,
			offset: 0,
		});

		socketClient.current.on('serverResponse', (data: IMessage[]) => {
			setMessages(data);
		});

		socketClient.current.on('message', (message: IMessage) => {
			setMessages((prevState) => [message, ...prevState]);
		});

		return () => {
			unsubscribe();
			if (socketClient.current) {
				socketClient.current.off();
			}
		};
	}, []);

	const sendMessage = () => {
		if (message.trim() === '') {
			return;
		}

		if (socketClient.current) {
			socketClient.current.emit('send-message', {
				user: userInfo && userInfo[0]?.id,
				message: message,
				chat: route.params.id,
			});
		}

		setMessage('');
	};

	const getMessagesByOffset = (offset: number) => {
		if (!isFetching) {
			if (socketClient.current) {
				setIsFetching(true);
				socketClient.current.emit('get-all-messages', {
					chatRoomId: route.params.id,
					size: 20,
					offset: offset,
				});

				socketClient.current.off('serverResponse');

				socketClient.current.once('serverResponse', (data: IMessage[]) => {
					setIsFetching(false);
					if (data.length > 0) {
						setMessages((prevMessages) => [...prevMessages, ...data]);
						setMessageCount((prevCount) => prevCount + 20);
					}
				});
			}
		}
	};

	const handleEndReached = () => {
		getMessagesByOffset(messageCount);
	};

	return (
		<NativeBaseProvider>
			<KeyboardAvoidingView behavior="position" w={{ base: '100%' }}>
				<InternetWarning
					open={!isConnected}
					error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
				/>
				<View style={styles.background}>
					<View style={styles.header}>
						<HStack
							alignItems="center"
							justifyContent="space-between"
							width="90%"
							flexDirection="row"
						>
							<ButtonGoBack
								blackText={true}
								onPressHandler={() => navigation.goBack()}
							/>
							{messages[0] && (
								<Text style={styles.titleName}>{messages[0].chat.chat}</Text>
							)}
						</HStack>
					</View>
					<Stack width="100%">
						<FlatList
							inverted
							height="650"
							data={messages}
							renderItem={({ item }) => (
								<Message
									byUser={
										userInfo &&
										userInfo.length > 0 &&
										item.user.id === userInfo[0].id
									}
									displayName={item.user.displayName}
									message={item.message}
									image={item.user.displayName[0]}
								/>
							)}
							onEndReachedThreshold={0}
							onEndReached={handleEndReached}
							keyExtractor={(item: IMessage) => item.id.toString()}
						/>
					</Stack>
					<View style={styles.footer}>
						<Input
							fontFamily="roboto"
							fontSize="20"
							w="80%"
							py="0"
							variant="rounded"
							size="2xl"
							height={50}
							borderColor="black"
							value={message}
							onChangeText={(message: string) => setMessage(message)}
							placeholder="Сообщение"
						/>
						<Button
							size="xl"
							w="1/6"
							h="full"
							rounded="none"
							borderColor="black"
							background="transparent"
							onPress={() => sendMessage()}
						>
							<Text style={styles.buttonTitle}>{'>'}</Text>
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</NativeBaseProvider>
	);
};

export default Chat;
