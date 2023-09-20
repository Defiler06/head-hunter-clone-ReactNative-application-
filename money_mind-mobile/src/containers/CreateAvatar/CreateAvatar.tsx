import React, { useState, useRef, useEffect } from 'react';
import {
	Button,
	NativeBaseProvider,
	Text,
	Image,
	Stack,
	HStack,
} from 'native-base';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useGetActivityQuery } from '../../store/services/activity';
import { useGetAvatarQuery } from '../../store/services/avatar';
import { useUserInfoMutation } from '../../store/services/auth';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import InputName from '../../components/Inputs/InputName/inputName';
import styles from './CreateAvatar.css';
import bgImage from '../../assets/images/backgroundCreateAvatar.png';
import inputImage from '../../assets/images/inputNameBackground.png';
import leftAvButton from '../../assets/images/left.png';
import rightAvButton from '../../assets/images/right.png';
import createButton from '../../assets/images/buttonCreate.png';
import leftButton from '../../assets/images/leftSelect.png';
import rightButton from '../../assets/images/rightSelect.png';
import { uri } from '../../constants/config';
import { Platform } from 'react-native';
import { CustomError } from '../../interfaces/errors/CustomError';
import ModalWindow from '../../components/UI/ModalWindow/modalWindow';
import NetInfo from '@react-native-community/netinfo';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';

interface ICarouselItemAvatar {
	avatar: string;
}

interface ICarouselItemActivity {
	activity: string;
}

const CreateAvatar = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const { data: activities } = useGetActivityQuery();
	const { data: avatars } = useGetAvatarQuery();
	const [userInfo, { error, isError }] = useUserInfoMutation();

	const [text, setText] = useState<string>('');
	const [stateActivity, setStateActivity] = useState<number>(0);

	const carouselRef = useRef<Carousel<ICarouselItemActivity>>(null);

	const [stateAvatar, setStateAvatar] = useState(0);
	const carouselRefAv = useRef<Carousel<ICarouselItemAvatar>>(null);

	const [open, setOpen] = useState(false);
	const [field, setField] = useState(false);
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	const snapToItemActivity = (item: number, state: number) => {
		if (carouselRef.current) {
			carouselRef.current.snapToItem(state + item);
		}
	};

	const snapToItemAvatar = (item: number, state: number) => {
		if (carouselRefAv.current) {
			carouselRefAv.current.snapToItem(state + item);
		}
	};

	const submitHandler = async () => {
		if (text.trim() === '') {
			setField(true);
			setOpen(true);
			return;
		}

		let activityUser = '2';
		if (stateActivity === 0) {
			if (activities) activityUser = activities[0].id;
		} else {
			activityUser = stateActivity.toString();
		}

		let avatarUser = '2';
		if (stateAvatar === 0) {
			if (avatars) {
				avatarUser = avatars[0].id;
			}
		} else {
			avatarUser = stateAvatar.toString();
		}

		const userInfos = await userInfo({
			idActivity: activityUser,
			idAvatar: avatarUser,
			displayName: text,
		});

		if (!(userInfos as { error: object }).error) {
			setText('');
			setStateAvatar(0);
			setStateActivity(0);
			navigation.navigate('Menu');
		}
	};

	const _renderItem = ({
		item,
		index,
	}: {
		item: ICarouselItemActivity;
		index: number;
	}) => {
		return (
			<Stack style={styles.avatarStack}>
				<ImageBackground
					source={inputImage as ImageSourcePropType}
					style={styles.imageInput}
				>
					<Text style={styles.TextAvatar}>{item.activity}</Text>
				</ImageBackground>
			</Stack>
		);
	};
	const _renderItemAvatar = ({
		item,
		index,
	}: {
		item: ICarouselItemAvatar;
		index: number;
	}) => {
		const cardImage = `${uri}/avatar/${item.avatar}`;

		return (
			<Stack style={styles.stackImageAvatar}>
				<Image
					source={{ uri: cardImage }}
					style={styles.imageAvatar}
					alt={'test'}
				/>
			</Stack>
		);
	};

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
				source={bgImage as ImageSourcePropType}
				resizeMode="cover"
				style={styles.container}
			>
				<InternetWarning
					open={!isConnected}
					error="Пожалуйста, проверьте свое интернет-подключение и попробуйте снова."
				/>
				<ModalWindow
					onClose={() => setOpen(false)}
					open={open}
					error={
						!field
							? (error as CustomError)?.data?.error
							: 'Все поля обязательные'
					}
				/>
				<Text style={styles.textTitle}>Выберите своего аватара</Text>
				<Stack>
					<InputName
						value={text}
						onInputHandler={(text: string) => setText(text)}
					/>
					<HStack style={styles.activity}>
						<Button
							style={styles.bgColorButton}
							onPress={() => snapToItemActivity(-1, stateActivity)}
						>
							<Image source={leftButton as ImageSourcePropType} alt="button" />
						</Button>
						{activities && (
							<Carousel
								layout={'default'}
								ref={carouselRef}
								data={activities}
								sliderWidth={300}
								itemWidth={300}
								renderItem={_renderItem}
								onSnapToItem={(index) => setStateActivity(index)}
							/>
						)}
						<Button
							style={styles.bgColorButton}
							onPress={() => snapToItemActivity(1, stateActivity)}
						>
							<Image source={rightButton as ImageSourcePropType} alt="button" />
						</Button>
					</HStack>
				</Stack>
				<Stack
					alignItems="center"
					justifyContent="center"
					space={Platform.OS === 'android' ? '8%' : 0}
				>
					<HStack style={styles.avatar}>
						<Button
							style={styles.bgColorButton}
							onPress={() => snapToItemAvatar(-1, stateAvatar)}
						>
							<Image
								source={leftAvButton as ImageSourcePropType}
								alt="button"
							/>
						</Button>
						{avatars && (
							<Carousel
								layout={'default'}
								ref={carouselRefAv}
								data={avatars}
								sliderWidth={400}
								itemWidth={400}
								renderItem={_renderItemAvatar}
								onSnapToItem={(index) => setStateAvatar(index)}
							/>
						)}
						<Button
							style={styles.bgColorButton}
							onPress={() => snapToItemAvatar(1, stateAvatar)}
						>
							<Image
								source={rightAvButton as ImageSourcePropType}
								alt="button"
							/>
						</Button>
					</HStack>
					<Button style={styles.bgColorButton} onPress={submitHandler}>
						<Image source={createButton as ImageSourcePropType} alt="button" />
					</Button>
				</Stack>
			</ImageBackground>
		</NativeBaseProvider>
	);
};
export default CreateAvatar;
