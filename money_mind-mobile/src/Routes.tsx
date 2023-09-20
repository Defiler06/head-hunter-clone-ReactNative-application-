import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAvatar from './containers/CreateAvatar/CreateAvatar';
import Menu from './containers/Menu/Menu';
import Profile from './containers/Profile/Profile';
import Store from './containers/Store/Store';
import Lessons from './containers/Lessons/Lessons';
import ShowChats from './containers/ShowChats/ShowChats';
import Chat from './containers/Chat/Chat';
import Lesson from './containers/Lesson/Lesson';
import Course from './containers/Course/Course';
import Answers from './containers/Answers/Answers';

export type RootStackParamList = {
	Register: undefined;
	Login: undefined;
	CreateAvatar: undefined;
	Menu: undefined;
	ShowChats: undefined;
	Chat: { id: string };
	Store: undefined;
	Lessons: undefined;
	Profile: undefined;
	Course: { id: string };
	Lesson: { id: string };
	Answers: { id: string };
};

const options = { headerShown: false };
const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
	const [appIsReady, setAppIsReady] = useState(false);
	const prepare = async (): Promise<void> => {
		try {
			await SplashScreen.preventAutoHideAsync();
			await Font.loadAsync({
				'web-font': require('./assets/fonts/000webfont.ttf'),
				'3997-font': require('./assets/fonts/3997-font.otf'),
				'zlusa-font': require('./assets/fonts/Zlusa_font.ttf'),
				roboto: require('./assets/fonts/Roboto-Regular.ttf'),
			});
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} catch (e) {
			console.warn(e);
		} finally {
			setAppIsReady(true);
		}
	};

	useEffect(() => {
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async (): Promise<void> => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<NavigationContainer onReady={onLayoutRootView}>
			<Stack.Navigator screenOptions={options} initialRouteName="Register">
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="CreateAvatar" component={CreateAvatar} />
				<Stack.Screen name="Menu" component={Menu} />
				<Stack.Screen name="ShowChats" component={ShowChats} />
				<Stack.Screen name="Chat" component={Chat} />
				<Stack.Screen name="Store" component={Store} />
				<Stack.Screen name="Lessons" component={Lessons} />
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="Course" component={Course} />
				<Stack.Screen name="Lesson" component={Lesson} />
				<Stack.Screen name="Answers" component={Answers} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
