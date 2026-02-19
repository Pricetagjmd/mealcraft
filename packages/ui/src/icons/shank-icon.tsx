import type { CSSProperties } from "react";

import { colors } from "../tokens";

interface ShankIconProps {
	filled?: boolean;
	size?: number;
}

/**
 * Web-compatible ShankIcon using standard SVG
 * For React Native, use ShankIcon from shank-icon.native.tsx
 */
export function ShankIcon({ filled = true, size = 20 }: ShankIconProps) {
	const fillColor = filled ? colors.grass : colors.cobble;
	const fillOpacity = filled ? 1 : 0.4;

	const style: CSSProperties = {
		width: size,
		height: size,
		flexShrink: 1,
	};

	return (
		<svg aria-hidden="true" style={style} viewBox="0 0 16 16">
			{/* Drumstick body */}
			<path
				d="M10 2h2v2h2v4h-2v2h-2v2h-2v2h-2v-2h-2v-2h2v-2h2v-2h2v-4z"
				fill={fillColor}
				fillOpacity={fillOpacity}
			/>
			{/* Bone handle */}
			<path
				d="M4 12h2v2h-2v-2z M2 10h2v2h-2v-2z"
				fill={fillColor}
				fillOpacity={fillOpacity}
			/>
		</svg>
	);
}

// Alias for backwards compatibility
export const ShankIconWeb = ShankIcon;
