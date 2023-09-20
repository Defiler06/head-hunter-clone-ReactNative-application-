import {
	Box,
	HStack,
	NativeBaseProvider,
	Progress,
	Stack,
	Text,
	View,
} from 'native-base';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { styles } from './Profile.css';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import ProfileItem from '../../components/ProfileItem/profileItem';
import { useGetUserInfoByTokenQuery } from '../../store/services/user';
import coinIcon from '../../assets/images/icons/coinIcon.png';
import backgroundProfile from '../../assets/images/backgroundProfile.png';
import { uri } from '../../constants/config';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { IEducation } from '../../interfaces/IEducation';

const Profile = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const { data: user } = useGetUserInfoByTokenQuery();
	const imageProfile = `${uri}/avatar/${user && user[0].id_avatar.avatar}`;
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	const countIsPassed: number =
		user &&
		user[0].education.reduce((count: number, item: IEducation) => {
			if (item.isPassed === true) {
				count++;
			}

			return count;
		}, 0);

	const countIsLessons: number =
		user &&
		user[0].education.reduce((count: number) => {
			count++;
			return count;
		}, 0);

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
			<InternetWarning
				open={!isConnected}
				error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
			/>
			<View style={styles.header}>
				<HStack space={'40%'} style={styles.hStack}>
					<ButtonGoBack onPressHandler={() => navigation.goBack()} />
					<View style={styles.coinBox}>
						<ImageBackground
							style={styles.imageCoin}
							source={coinIcon as ImageSourcePropType}
						/>
						<Text style={styles.headerText}>100</Text>
					</View>
				</HStack>
			</View>
			<ImageBackground
				source={backgroundProfile as ImageSourcePropType}
				style={styles.imageBackground}
			>
				<Stack space={5} style={styles.profileName}>
					<View style={styles.profileImage}>
						<ImageBackground
							source={{ uri: imageProfile }}
							style={styles.imageProfile}
							resizeMode={'cover'}
						/>
					</View>
					<View style={styles.profileUserName}>
						<Text style={styles.userName}>{user && user[0]?.displayName}</Text>
						<View style={styles.lineUnder} />
					</View>

					<Stack space={6} style={styles.infoUser}>
						<ProfileItem title="Почта" subtitle={user && user[0]?.email} />
						<ProfileItem
							title="Тип деятельности"
							subtitle={user && user[0]?.id_activity.activity}
						/>
						<ProfileItem
							title="Прогресс игры"
							subtitle={`${countIsPassed} из ${countIsLessons} уроков`}
						/>
						<Box w="90%" shadow={2}>
							<Progress
								value={countIsPassed * (100 / countIsLessons)}
								_filledTrack={{
									borderRadius: 0,
									bg: '#64B68A',
								}}
								style={styles.progressBar}
							/>
						</Box>
					</Stack>
				</Stack>
			</ImageBackground>
		</NativeBaseProvider>
	);
};

export default Profile;
