import { Center, HStack, NativeBaseProvider, Stack } from 'native-base';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import MenuItem from '../../components/MenuItem/menuItem';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { styles } from './Menu.css';
import backgroundMenu from '../../assets/images/backgroundMenu.png';
import lessonIcon from '../../assets/images/icons/lessonIcon.png';
import storeIcon from '../../assets/images/icons/storeIcon.png';
import chatIcon from '../../assets/images/icons/chatIcon.png';
import profileIcon from '../../assets/images/icons/profileIcon.png';
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';

const Menu = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

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
				source={backgroundMenu as ImageSourcePropType}
				style={styles.imageBackground}
			>
				<InternetWarning
					open={!isConnected}
					error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
				/>
				<Center style={styles.center}>
					<Stack space={2}>
						<HStack space={1}>
							<MenuItem
								onPressHandler={() => navigation.navigate('Lessons')}
								textButton="Уроки"
								pathToIcon={lessonIcon as ImageSourcePropType}
							/>
							<MenuItem
								onPressHandler={() => navigation.navigate('ShowChats')}
								textButton="Чат"
								pathToIcon={chatIcon as ImageSourcePropType}
							/>
						</HStack>
						<HStack space={1}>
							<MenuItem
								onPressHandler={() => navigation.navigate('Store')}
								textButton="Магазин"
								pathToIcon={storeIcon as ImageSourcePropType}
							/>
							<MenuItem
								onPressHandler={() => navigation.navigate('Profile')}
								textButton="Профиль"
								pathToIcon={profileIcon as ImageSourcePropType}
							/>
						</HStack>
					</Stack>
				</Center>
			</ImageBackground>
		</NativeBaseProvider>
	);
};

export default Menu;
