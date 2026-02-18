import type React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/providers/theme-provider";

export const Container = ({ children }: { children: React.ReactNode }) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.background,
					paddingBottom: insets.bottom,
				},
			]}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
