import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider, useTheme } from "@/providers/theme-provider";
import { queryClient } from "@/utils/trpc";

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
					fontFamily: theme.fonts.heading,
				},
				headerTintColor: theme.colors.foreground,
				contentStyle: {
					backgroundColor: theme.colors.background,
				},
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
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
