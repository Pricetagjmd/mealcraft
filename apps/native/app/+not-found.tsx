import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { type Theme, useTheme } from "@/providers/theme-provider";

export default function NotFoundScreen() {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<>
			<Stack.Screen options={{ title: "Not Found" }} />
			<View style={styles.container}>
				<Text style={styles.title}>PAGE NOT FOUND</Text>
				<Link href="/" style={styles.link}>
					<Text style={styles.linkText}>Go Home</Text>
				</Link>
			</View>
		</>
	);
}

function getStyles(theme: Theme) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.colors.background,
			padding: theme.spacing[6],
		},
		title: {
			fontFamily: theme.fonts.heading,
			fontSize: theme.fontSize["3xl"],
			color: theme.colors.foreground,
			marginBottom: theme.spacing[4],
		},
		link: {
			paddingVertical: theme.spacing[2],
			paddingHorizontal: theme.spacing[4],
			backgroundColor: theme.colors.primary,
			borderRadius: theme.borderRadius.voxel,
			borderWidth: theme.borderWidth.default,
			borderColor: theme.colors.border,
		},
		linkText: {
			fontFamily: theme.fonts.heading,
			fontSize: theme.fontSize.base,
			color: theme.colors.primaryForeground,
			textTransform: "uppercase",
		},
	});
}
