import { StatBar } from "@mealcraft/ui/components";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>MEALCRAFT</Text>
			<View style={styles.statsContainer}>
				<StatBar value={7} variant="health" />
				<StatBar value={3} variant="hunger" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
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
		marginBottom: theme.spacing[6],
	},
	statsContainer: {
		gap: theme.spacing[4],
	},
}));
