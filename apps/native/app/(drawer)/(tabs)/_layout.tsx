import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/tabbar-icon";
import { useTheme } from "@/providers/theme-provider";

export default function TabLayout() {
	const { theme } = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.mutedForeground,
				tabBarStyle: {
					backgroundColor: theme.colors.background,
					borderTopColor: theme.colors.border,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <TabBarIcon color={color} name="home" />,
				}}
			/>
			<Tabs.Screen
				name="two"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<TabBarIcon color={color} name="compass" />
					),
				}}
			/>
		</Tabs>
	);
}
