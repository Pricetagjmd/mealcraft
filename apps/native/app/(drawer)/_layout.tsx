import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Constants from "expo-constants";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

import { useStyles } from "@/lib/styles";

import { HeaderButton } from "../../components/header-button";

const isExpoGo = Constants.appOwnership === "expo";

export default function DrawerLayout() {
	const { theme } = useStyles();

	const headerOptions = {
		headerStyle: {
			backgroundColor: theme.colors.background,
		},
		headerTitleStyle: {
			color: theme.colors.foreground,
		},
		headerTintColor: theme.colors.foreground,
	};

	// Expo Go: Stack only. expo-router/drawer is never loaded.
	if (isExpoGo) {
		return (
			<Stack screenOptions={headerOptions}>
				<Stack.Screen
					name="index"
					options={{
						headerTitle: "Home",
						headerRight: () => (
							<Link asChild href="/(drawer)/(tabs)">
								<Pressable style={{ marginRight: 16 }}>
									<MaterialIcons
										color={theme.colors.foreground}
										name="border-bottom"
										size={24}
									/>
								</Pressable>
							</Link>
						),
					}}
				/>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerTitle: "Tabs",
						headerRight: () => (
							<Link asChild href="/modal">
								<HeaderButton />
							</Link>
						),
					}}
				/>
			</Stack>
		);
	}

	// Dev build / production: Use Drawer navigator (loaded dynamically to avoid Expo Go).
	// Use dynamic require that Metro can't statically analyze
	let Drawer: any;
	try {
		// Use a pattern Metro can't statically analyze
		const drawerPath = "expo-router/drawer";
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const drawerModule = require(drawerPath);
		Drawer = drawerModule.Drawer || drawerModule.default;
		if (!Drawer) {
			throw new Error("Drawer not found in expo-router/drawer module");
		}
	} catch (error) {
		console.error("Failed to load Drawer:", error);
		// Fallback to Stack if drawer fails to load
		return (
			<Stack screenOptions={headerOptions}>
				<Stack.Screen name="index" options={{ headerTitle: "Home" }} />
				<Stack.Screen name="(tabs)" options={{ headerTitle: "Tabs" }} />
			</Stack>
		);
	}

	return (
		<Drawer
			screenOptions={{
				...headerOptions,
				drawerStyle: {
					backgroundColor: theme.colors.background,
				},
				drawerLabelStyle: {
					color: theme.colors.foreground,
				},
				drawerInactiveTintColor: theme.colors.mutedForeground,
			}}
		>
			<Drawer.Screen
				name="index"
				options={{
					headerTitle: "Home",
					drawerLabel: "Home",
					drawerIcon: ({ size, color }) => (
						<Ionicons color={color} name="home-outline" size={size} />
					),
				}}
			/>
			<Drawer.Screen
				name="(tabs)"
				options={{
					headerTitle: "Tabs",
					drawerLabel: "Tabs",
					drawerIcon: ({ size, color }) => (
						<MaterialIcons color={color} name="border-bottom" size={size} />
					),
					headerRight: () => (
						<Link asChild href="/modal">
							<HeaderButton />
						</Link>
					),
				}}
			/>
		</Drawer>
	);
}
