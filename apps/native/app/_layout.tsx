import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider, useTheme } from "@/providers/theme-provider";
import { queryClient } from "@/utils/trpc";

export const unstable_settings = {
	initialRouteName: "(drawer)",
};

function RootLayoutNav() {
	const { theme } = useTheme();

	return (
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
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemeProvider>
					<RootLayoutNav />
				</ThemeProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}
