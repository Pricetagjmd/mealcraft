import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Container } from "@/components/container";
import { type Theme, useTheme } from "@/providers/theme-provider";

export default function Home() {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<Container>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.headerSection}>
					<Text style={styles.title}>Tab One</Text>
					<Text style={styles.subtitle}>
						Explore the first section of your app
					</Text>
				</View>
			</ScrollView>
		</Container>
	);
}

function getStyles(theme: Theme) {
	return StyleSheet.create({
		container: {
			padding: theme.spacing.lg,
		},
		headerSection: {
			paddingVertical: theme.spacing.xl,
		},
		title: {
			fontSize: theme.fontSize["3xl"],
			fontWeight: "bold",
			color: theme.colors.foreground,
			marginBottom: theme.spacing.sm,
		},
		subtitle: {
			fontSize: theme.fontSize.lg,
			color: theme.colors.mutedForeground,
		},
	});
}
