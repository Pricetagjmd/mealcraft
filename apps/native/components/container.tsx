import type React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "@/lib/styles";

export const Container = ({ children }: { children: React.ReactNode }) => {
	return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		paddingBottom: rt.insets.bottom,
	},
}));
