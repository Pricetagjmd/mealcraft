import type { CSSProperties } from "react";

import { HeartIcon, ShankIcon } from "../icons";
import { borderRadius, durations, shadows } from "../tokens";
import { OverflowBadge } from "./overflow-badge";

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
 * Web-compatible StatBar using standard CSS and HTML
 * For React Native, use StatBar from stat-bar.native.tsx
 */
export function StatBar({ variant, value, max, onExpand }: StatBarProps) {
	const maxIcons = max ?? DEFAULT_MAX[variant];
	const filledCount = Math.min(Math.max(0, value), maxIcons);
	const emptyCount = maxIcons - filledCount;
	const overflow = Math.max(0, value - maxIcons);

	const IconComponent = variant === "health" ? HeartIcon : ShankIcon;
	const keys = generateIconKeys(filledCount, emptyCount);

	const accessibilityLabel = `${variant === "health" ? "Health" : "Hunger"}: ${value} of ${maxIcons}`;

	const containerStyle: CSSProperties = {
		alignItems: "center",
		backgroundColor: "transparent",
		border: "none",
		borderRadius: borderRadius.voxel,
		boxShadow: `${shadows.voxel.shadowOffset.width}px ${shadows.voxel.shadowOffset.height}px 0px 0px rgba(0, 0, 0, ${shadows.voxel.shadowOpacity})`,
		cursor: onExpand ? "pointer" : "default",
		display: "inline-flex",
		flexDirection: "row",
		height: 24,
		padding: 2,
		transition: `box-shadow ${durations.fast}ms ease-out, transform ${durations.fast}ms ease-out`,
	};

	const iconRowStyle: CSSProperties = {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		gap: 2,
	};

	const handleClick = () => {
		if (onExpand) {
			onExpand();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (onExpand) {
				onExpand();
			}
		}
	};

	return (
		<button
			aria-label={accessibilityLabel}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={containerStyle}
			type="button"
		>
			<div style={iconRowStyle}>
				{keys.filled.map((key) => (
					<IconComponent filled key={key} size={20} />
				))}
				{keys.empty.map((key) => (
					<IconComponent filled={false} key={key} size={20} />
				))}
				{overflow > 0 && <OverflowBadge count={overflow} />}
			</div>
		</button>
	);
}

// Alias for backwards compatibility
export const StatBarWeb = StatBar;
