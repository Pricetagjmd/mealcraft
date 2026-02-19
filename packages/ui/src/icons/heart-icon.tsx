import type { CSSProperties } from "react";

import { colors } from "../tokens";

interface HeartIconProps {
	filled?: boolean;
	size?: number;
}

/**
 * Web-compatible HeartIcon using standard SVG
 * For React Native, use HeartIcon from heart-icon.native.tsx
 */
export function HeartIcon({ filled = true, size = 20 }: HeartIconProps) {
	const fillColor = filled ? colors.grass : colors.cobble;
	const fillOpacity = filled ? 1 : 0.4;

	const style: CSSProperties = {
		width: size,
		height: size,
		flexShrink: 1,
	};

	return (
		<svg aria-hidden="true" style={style} viewBox="0 0 16 16">
			<path
				d="M2 4h2v-2h4v2h2v-2h4v2h2v4h-2v2h-2v2h-2v2h-2v-2h-2v-2h-2v-2h-2v-4z"
				fill={fillColor}
				fillOpacity={fillOpacity}
			/>
		</svg>
	);
}

// Alias for backwards compatibility
export const HeartIconWeb = HeartIcon;
