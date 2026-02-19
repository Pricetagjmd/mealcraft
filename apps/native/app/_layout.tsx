import "../unistyles";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { queryClient } from "@/utils/trpc";

function RootLayoutNav() {
	const { theme } = useUnistyles();

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
			<View style={{ flex: 1 }}>
				<RootLayoutNav />
			</View>
		</QueryClientProvider>
	);
}
