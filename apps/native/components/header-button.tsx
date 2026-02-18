import FontAwesome from "@expo/vector-icons/FontAwesome";
import { forwardRef } from "react";
import { Pressable, StyleSheet } from "react-native";

import { type Theme, useTheme } from "@/providers/theme-provider";

export const HeaderButton = forwardRef<
	typeof Pressable,
	{ onPress?: () => void }
>(({ onPress }, _ref) => {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<Pressable onPress={onPress} style={styles.button}>
			{({ pressed }) => (
				<FontAwesome
					color={theme.colors.secondaryForeground}
					name="info-circle"
					size={20}
					style={{
						opacity: pressed ? 0.7 : 1,
					}}
				/>
			)}
		</Pressable>
	);
});

function getStyles(theme: Theme) {
	return StyleSheet.create({
		button: {
			padding: theme.spacing.sm,
			marginRight: theme.spacing.sm,
			borderRadius: theme.borderRadius.lg,
			backgroundColor: `${theme.colors.secondary}80`,
		},
	});
}
