import { Button, Center, Text, View } from 'native-base';
import { Dimensions } from 'react-native';
import { styles } from './lessonmaterial.css';
import { ResizeMode } from 'expo-av';
import React, { MouseEvent, useRef, useState } from 'react';
import VideoPlayer from 'expo-video-player';

interface IPropsLessonMaterial {
	titletext: string;
	onPressHandler: (e: MouseEvent<HTMLFormElement>) => void;
	text: string;
	videolink: string;
	play: boolean;
}

export default function LessonMaterial({
	titletext,
	onPressHandler,
	text,
	videolink,
	play,
}: IPropsLessonMaterial) {
	const [inFullscreen, setInFullsreen] = useState(false);
	const [inFullscreen2, setInFullsreen2] = useState(false);
	const refVideo2 = useRef(null);

	return (
		<Center>
			<View style={styles.flexset}>
				<View style={styles.titlelesson}>
					<Text style={styles.titletextlesson}> {titletext}</Text>
				</View>

				<View style={styles.container}>
					<VideoPlayer
						videoProps={{
							shouldPlay: play,
							resizeMode: ResizeMode.CONTAIN,
							source: {
								uri: `${videolink}`,
							},
							ref: refVideo2,
						}}
						style={{
							videoBackgroundColor: 'black',
							height: inFullscreen2 ? Dimensions.get('window').width : 270,
							width: inFullscreen2 ? Dimensions.get('window').height : 460,
						}}
					/>
				</View>

				<View style={styles.textlesson}>
					<Text style={styles.textlessontext}> Описание урока</Text>
					<Text style={styles.textlessontext}> {text}</Text>
				</View>
				<View style={styles.btnlesson}>
					<Button onPress={onPressHandler}>
						<Text style={styles.textbtn}>Перейти к Заданию</Text>
					</Button>
				</View>
			</View>
		</Center>
	);
}
