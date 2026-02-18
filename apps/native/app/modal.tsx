import { StyleSheet, Text, View } from "react-native";

import { Container } from "@/components/container";
import { type Theme, useTheme } from "@/providers/theme-provider";

export default function Modal() {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<Container>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Modal</Text>
				</View>
			</View>
		</Container>
	);
}

function getStyles(theme: Theme) {
	return StyleSheet.create({
		container: {
			flex: 1,
			padding: theme.spacing.lg,
		},
		header: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: theme.spacing.xl,
		},
		title: {
			fontSize: theme.fontSize["2xl"],
			fontWeight: "bold",
			color: theme.colors.foreground,
		},
	});
}
