import type { CSSProperties } from "react";

import { borderRadius, borderWidth, colors, fontSizes, fonts } from "../tokens";

interface OverflowBadgeProps {
	count: number;
}

/**
 * Web-compatible OverflowBadge using standard CSS
 * For React Native, use OverflowBadgeNative from overflow-badge.native.tsx
 */
export function OverflowBadge({ count }: OverflowBadgeProps) {
	if (count <= 0) {
		return null;
	}

	const badgeStyle: CSSProperties = {
		backgroundColor: colors.ember,
		borderColor: colors.obsidian,
		borderRadius: borderRadius.voxel,
		borderStyle: "solid",
		borderWidth: borderWidth.thin,
		marginLeft: 4,
		paddingLeft: 4,
		paddingRight: 4,
		paddingTop: 2,
		paddingBottom: 2,
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const textStyle: CSSProperties = {
		color: colors.white,
		fontFamily: fonts.heading,
		fontSize: fontSizes.sm,
		lineHeight: 1,
	};

	return (
		<span style={badgeStyle}>
			<span style={textStyle}>+{count}</span>
		</span>
	);
}

// Alias for backwards compatibility
export const OverflowBadgeWeb = OverflowBadge;
