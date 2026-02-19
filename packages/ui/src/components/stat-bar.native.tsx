import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { HeartIcon, ShankIcon } from "../icons/icons.native";
import { OverflowBadge } from "./overflow-badge.native";

const DEFAULT_MAX = {
	health: 10,
	hunger: 4,
} as const;

interface StatBarProps {
	accessibilityLabel?: string;
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
 */
export function StatBar({
	variant,
	value,
	max,
	onExpand,
	accessibilityLabel: customAccessibilityLabel,
}: StatBarProps) {
	const maxIcons = max ?? DEFAULT_MAX[variant];
	const filledCount = Math.min(Math.max(0, value), maxIcons);
	const emptyCount = maxIcons - filledCount;
	const overflow = Math.max(0, value - maxIcons);

	const IconComponent = variant === "health" ? HeartIcon : ShankIcon;
	const keys = generateIconKeys(filledCount, emptyCount);

	const defaultAccessibilityLabel = `${variant === "health" ? "Health" : "Hunger"}: ${value} of ${maxIcons}`;
	const accessibilityLabel =
		customAccessibilityLabel ?? defaultAccessibilityLabel;

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

const styles = StyleSheet.create((theme) => ({
	container: {
		alignItems: "center",
		backgroundColor: "transparent",
		borderRadius: theme.borderRadius.voxel,
		flexDirection: "row",
		height: 24,
		paddingHorizontal: 2,
		paddingVertical: 2,
	},
	iconRow: {
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "nowrap",
		gap: 2,
	},
}));

// Alias for backwards compatibility
export const StatBarWeb = StatBar;
