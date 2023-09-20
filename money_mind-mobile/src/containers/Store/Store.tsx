import { NativeBaseProvider, Stack, Text, View, HStack } from 'native-base';
import { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { useGetProductsQuery } from '../../store/services/product';
import ButtonGoBack from '../../components/ButtonGoBack/buttonGoBack';
import ModalWindow from '../../components/UI/ModalWindow/modalWindow';
import coinIcon from '../../assets/images/icons/coinIcon.png';
import { styles } from './Store.css';
import StoreItemCard from '../../components/StoreItem/storeItem';
import InternetWarning from '../../components/UI/InternetWarning/InternetWarning';
import NetInfo from '@react-native-community/netinfo';
import { IProduct } from '../../interfaces/IProduct';

const Store = ({
	navigation,
}: {
	navigation: NavigationProp<ParamListBase>;
}) => {
	const { data: items } = useGetProductsQuery();
	const [showModal, setShowModal] = useState(false);
	const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
	const [isConnected, setIsConnected] = useState<boolean | null>(true);

	const renderStoreItems = items?.map((item: IProduct) => {
		return (
			<StoreItemCard
				key={item.id}
				title={item.title}
				description={item.description}
				image={item.image}
				price={item.price.toString()}
				onPressHandler={() => {
					setShowModal(true);
				}}
			/>
		);
	});

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
			<ModalWindow
				onClose={() => setShowModal(false)}
				open={showModal}
				keyboardStatus={keyboardStatus}
				error={showModal ? 'Поздравляем с покупкой' : 'Поздравляем с покупкой'}
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
			<Stack width="100%" space={2} style={styles.mainBlock}>
				<Stack alignItems="center" width="100%" space={5}>
					<Text style={styles.title}>Магазин</Text>
				</Stack>
				<Stack space={5}>{renderStoreItems}</Stack>
			</Stack>
		</NativeBaseProvider>
	);
};

export default Store;
