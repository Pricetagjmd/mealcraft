import { StyleSheet, Text, View } from "react-native";

import { borderRadius, borderWidth, colors, fontSizes, fonts } from "../tokens";

interface OverflowBadgeProps {
	count: number;
}

/**
 * React Native OverflowBadge component showing +N when value exceeds max icons
 * Uses Ember background with White text per design spec
 */
function getStyles() {
	// Defer StyleSheet.create to first render so we don't trigger TurboModuleRegistry
	// (PlatformConstants) at module load time (crashes in Expo Go).
	if (!cachedStyles) {
		cachedStyles = StyleSheet.create({
			badge: {
				backgroundColor: colors.ember,
				borderColor: colors.obsidian,
				borderRadius: borderRadius.voxel,
				borderWidth: borderWidth.thin,
				marginLeft: 4,
				paddingHorizontal: 4,
				paddingVertical: 2,
			},
			text: {
				color: colors.white,
				fontFamily: fonts.heading,
				fontSize: fontSizes.sm,
				lineHeight: fontSizes.sm,
			},
		});
	}
	return cachedStyles;
}
let cachedStyles: ReturnType<
	typeof StyleSheet.create<{ badge: object; text: object }>
> | null = null;

export function OverflowBadge({ count }: OverflowBadgeProps) {
	if (count <= 0) {
		return null;
	}
	const styles = getStyles();
	return (
		<View style={styles.badge}>
			<Text style={styles.text}>+{count}</Text>
		</View>
	);
}

// Alias for backwards compatibility
export const OverflowBadgeWeb = OverflowBadge;
