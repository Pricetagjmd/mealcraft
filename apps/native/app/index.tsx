import { StyleSheet, Text, View } from "react-native";

import { type Theme, useTheme } from "@/providers/theme-provider";

export default function Index() {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>MEALCRAFT</Text>
			<Text style={styles.subtitle}>Ready to design</Text>
		</View>
	);
}

function getStyles(theme: Theme) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.colors.background,
		},
		title: {
			fontFamily: theme.fonts.heading,
			fontSize: theme.fontSize["5xl"],
			color: theme.colors.foreground,
			marginBottom: theme.spacing[2],
		},
		subtitle: {
			fontFamily: theme.fonts.body,
			fontSize: theme.fontSize.base,
			color: theme.colors.foreground,
		},
	});
}
