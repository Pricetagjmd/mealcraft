/**
 * Voxel Design System Theme
 * Uses design tokens from @mealcraft/ui/tokens
 */

import {
	borderRadius,
	borderWidth,
	colors,
	disabled,
	durations,
	focus,
	fontSizes,
	fonts,
	lineHeights,
	semanticColors,
	shadows,
	spacing,
} from "@mealcraft/ui/tokens";

export const voxelTheme = {
	colors: {
		// Core palette
		...colors,

		// Semantic mappings
		background: colors.sky,
		foreground: colors.obsidian,
		card: colors.stone,
		cardForeground: colors.white,
		primary: colors.grass,
		primaryForeground: colors.white,
		secondary: colors.cobble,
		secondaryForeground: colors.white,
		muted: colors.stone,
		mutedForeground: colors.white,
		accent: colors.diamond,
		accentForeground: colors.obsidian,
		border: colors.obsidian,
		input: colors.white,
		ring: colors.grass,

		// Semantic colors
		success: semanticColors.success,
		warning: semanticColors.warning,
		danger: semanticColors.danger,
		info: semanticColors.info,

		// Disabled state
		disabled: disabled.background,
	},
	spacing,
	borderRadius: {
		voxel: borderRadius.voxel,
	},
	borderWidth: {
		default: borderWidth.default,
		thin: borderWidth.thin,
		thick: borderWidth.thick,
	},
	fontSize: fontSizes,
	fonts,
	lineHeights,
	shadows,
	focus,
	disabled: {
		opacity: disabled.opacity,
	},
	durations,
} as const;

export type VoxelTheme = typeof voxelTheme;
