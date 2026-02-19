import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>MEALCRAFT</Text>
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
	},
}));
