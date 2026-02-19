import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface OverflowBadgeProps {
	count: number;
}

/**
 * React Native OverflowBadge component showing +N when value exceeds max icons
 * Uses Ember background with White text per design spec
 */
export function OverflowBadge({ count }: OverflowBadgeProps) {
	if (count <= 0) {
		return null;
	}
	return (
		<View style={styles.badge}>
			<Text style={styles.text}>+{count}</Text>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	badge: {
		backgroundColor: theme.colors.ember,
		borderColor: theme.colors.obsidian,
		borderRadius: theme.borderRadius.voxel,
		borderWidth: theme.borderWidth.thin,
		marginLeft: 4,
		paddingHorizontal: 4,
		paddingVertical: 2,
	},
	text: {
		color: theme.colors.white,
		fontFamily: theme.fonts.heading,
		fontSize: theme.fontSize.sm,
		lineHeight: theme.fontSize.sm,
	},
}));

// Alias for backwards compatibility
export const OverflowBadgeWeb = OverflowBadge;
