import Svg, { Path } from "react-native-svg";

import { colors } from "../tokens";

interface ShankIconProps {
	filled?: boolean;
	size?: number;
}

/**
 * Pixelated drumstick/shank icon for hunger stat display
 * Voxel-style design with hard edges
 * React Native version using react-native-svg
 */
export function ShankIcon({ filled = true, size = 20 }: ShankIconProps) {
	const fillColor = filled ? colors.grass : colors.cobble;
	const fillOpacity = filled ? 1 : 0.4;

	return (
		<Svg
			height={size}
			style={{ flexShrink: 1 }}
			viewBox="0 0 16 16"
			width={size}
		>
			{/* Drumstick body */}
			<Path
				d="M10 2h2v2h2v4h-2v2h-2v2h-2v2h-2v-2h-2v-2h2v-2h2v-2h2v-4z"
				fill={fillColor}
				fillOpacity={fillOpacity}
			/>
			{/* Bone handle */}
			<Path
				d="M4 12h2v2h-2v-2z M2 10h2v2h-2v-2z"
				fill={fillColor}
				fillOpacity={fillOpacity}
			/>
		</Svg>
	);
}

// Alias for backwards compatibility
export const ShankIconWeb = ShankIcon;
