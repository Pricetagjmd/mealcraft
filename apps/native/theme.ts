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
	// Animation configuration for Reanimated
	// Actual animation functions are in ./animations.ts
	animations: {
		shake: { duration: 300, amplitude: 4, easing: "ease-in-out" as const },
		depress: { duration: durations.fast, translateY: 2 },
		pulse: { duration: durations.pulse, opacityMin: 0.4, opacityMax: 0.7 },
		skeleton: { duration: durations.pulse, opacityMin: 0.4, opacityMax: 0.7 },
	},
	// TODO: Add noise texture overlay for Stone/Wood surfaces
	// - Create 64x64 tileable noise PNG at apps/native/assets/noise-tile.png
	// - Create NoiseOverlay component using ImageBackground
	// - Apply at 5-10% opacity over Stone/Wood backgrounds
} as const;

export type VoxelTheme = typeof voxelTheme;
