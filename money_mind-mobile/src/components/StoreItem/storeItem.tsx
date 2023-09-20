import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './storeItem.css';
import { uri } from '../../constants/config';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import coinIcon from '../../assets/images/icons/coinIcon.png';

interface IPropsStoreItem {
	image: string;
	title: string;
	description: string;
	price: string;
	onPressHandler: () => void;
}

const StoreItemCard = ({
	image,
	title,
	description,
	price,
	onPressHandler,
}: IPropsStoreItem) => {
	let cardImage = '';

	if (image !== null) {
		cardImage = `${uri}/store/${image}`;
	} else {
		cardImage = `${uri}/store/noimage.png`;
	}

	return (
		<TouchableOpacity onPress={onPressHandler}>
			<View style={styles.container}>
				<Image source={{ uri: cardImage }} style={styles.image} />
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
					<View>
						<ImageBackground
							style={styles.imageCoin}
							source={coinIcon as ImageSourcePropType}
						/>
						<Text style={styles.price}>{price}</Text>
					</View>
					<Text style={styles.price}>Купить</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default StoreItemCard;
