import Svg, { Path } from "react-native-svg";

import { colors } from "../tokens";

interface HeartIconProps {
	filled?: boolean;
	size?: number;
}

/**
 * Pixelated heart icon for health stat display
 * Voxel-style design with hard edges
 * React Native version using react-native-svg
 */
export function HeartIcon({ filled = true, size = 20 }: HeartIconProps) {
	const fillColor = filled ? colors.grass : colors.cobble;
	const fillOpacity = filled ? 1 : 0.4;

	return (
		<Svg
			height={size}
			style={{ flexShrink: 1 }}
			viewBox="0 0 16 16"
			width={size}
		>
			<Path
				d="M2 4h2v-2h4v2h2v-2h4v2h2v4h-2v2h-2v2h-2v2h-2v-2h-2v-2h-2v-2h-2v-4z"
				fill={fillColor}
				fillOpacity={fillOpacity}
			/>
		</Svg>
	);
}

// Alias for backwards compatibility
export const HeartIconWeb = HeartIcon;
