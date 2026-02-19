import { Pressable, StyleSheet, View } from "react-native";

import { HeartIcon, ShankIcon } from "../icons/icons.native";
import { borderRadius, shadows } from "../tokens";
import { OverflowBadge } from "./overflow-badge.native";

const DEFAULT_MAX = {
	health: 10,
	hunger: 4,
} as const;

interface StatBarProps {
	max?: number;
	onExpand?: () => void;
	value: number;
	variant: "health" | "hunger";
}

/**
 * Generate stable keys for icon rendering
 * Icons are static and never reorder, so index-based keys are safe
 */
function generateIconKeys(
	filledCount: number,
	emptyCount: number
): { filled: string[]; empty: string[] } {
	return {
		filled: Array.from({ length: filledCount }, (_, i) => `filled-${i}`),
		empty: Array.from({ length: emptyCount }, (_, i) => `empty-${i}`),
	};
}

/**
 * React Native StatBar component for displaying Health (hearts) or Hunger (shanks)
 * Renders filled icons left-to-right, with overflow badge for excess values
 *
 * Note: This simplified version doesn't use react-native-reanimated for Expo Go compatibility.
 * For the animated version, use a dev build with react-native-reanimated installed.
 */
function getStatBarStyles() {
	// Defer StyleSheet.create to first render (avoids TurboModuleRegistry/PlatformConstants at load in Expo Go).
	if (!statBarStylesCache) {
		statBarStylesCache = StyleSheet.create({
			container: {
				alignItems: "center",
				backgroundColor: "transparent",
				borderRadius: borderRadius.voxel,
				flexDirection: "row",
				height: 24,
				paddingHorizontal: 2,
				paddingVertical: 2,
				shadowColor: shadows.voxel.shadowColor,
				shadowOffset: shadows.voxel.shadowOffset,
				shadowOpacity: shadows.voxel.shadowOpacity,
				shadowRadius: shadows.voxel.shadowRadius,
				elevation: shadows.voxel.elevation,
			},
			iconRow: {
				alignItems: "center",
				flexDirection: "row",
				flexWrap: "nowrap",
				gap: 2,
			},
		});
	}
	return statBarStylesCache;
}
let statBarStylesCache: ReturnType<
	typeof StyleSheet.create<{ container: object; iconRow: object }>
> | null = null;

export function StatBar({ variant, value, max, onExpand }: StatBarProps) {
	const maxIcons = max ?? DEFAULT_MAX[variant];
	const filledCount = Math.min(Math.max(0, value), maxIcons);
	const emptyCount = maxIcons - filledCount;
	const overflow = Math.max(0, value - maxIcons);

	const IconComponent = variant === "health" ? HeartIcon : ShankIcon;
	const keys = generateIconKeys(filledCount, emptyCount);
	const styles = getStatBarStyles();

	const accessibilityLabel = `${variant === "health" ? "Health" : "Hunger"}: ${value} of ${maxIcons}`;

	return (
		<Pressable
			accessibilityLabel={accessibilityLabel}
			accessibilityRole="button"
			onPress={onExpand}
		>
			<View style={styles.container}>
				<View style={styles.iconRow}>
					{keys.filled.map((key) => (
						<IconComponent filled key={key} size={20} />
					))}
					{keys.empty.map((key) => (
						<IconComponent filled={false} key={key} size={20} />
					))}
					{overflow > 0 && <OverflowBadge count={overflow} />}
				</View>
			</View>
		</Pressable>
	);
}

// Alias for backwards compatibility
export const StatBarWeb = StatBar;
