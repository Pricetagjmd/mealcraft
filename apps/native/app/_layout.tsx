import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import {
	SpaceMono_400Regular,
	SpaceMono_700Bold,
} from "@expo-google-fonts/space-mono";
import { VT323_400Regular } from "@expo-google-fonts/vt323";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

import { useStyles } from "@/lib/styles";
import { queryClient } from "@/utils/trpc";

const isExpoGo = Constants.appOwnership === "expo";

// Lazy load gesture-handler (NitroModules not supported in Expo Go)
// Only loads when actually used (not in Expo Go)
function getGestureHandlerRootView() {
	if (isExpoGo) {
		return View;
	}
	// Use dynamic require path that Metro can't statically analyze
	try {
		const gesturePath = "react-native-gesture-handler";
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const gestureHandler = require(gesturePath);
		return gestureHandler?.GestureHandlerRootView || View;
	} catch {
		return View;
	}
}

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
	initialRouteName: "(drawer)",
};

export default function RootLayout() {
	const { theme } = useStyles();
	const [fontsLoaded] = useFonts({
		VT323: VT323_400Regular,
		SpaceMono: SpaceMono_400Regular,
		"SpaceMono-Bold": SpaceMono_700Bold,
		PressStart2P: PressStart2P_400Regular,
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	const GestureHandlerRootView = getGestureHandlerRootView();

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: theme.colors.background,
						},
						headerTitleStyle: {
							color: theme.colors.foreground,
						},
						headerTintColor: theme.colors.foreground,
					}}
				>
					<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
					<Stack.Screen
						name="modal"
						options={{ title: "Modal", presentation: "modal" }}
					/>
				</Stack>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}
