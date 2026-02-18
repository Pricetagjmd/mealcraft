/**
 * Voxel UI Design Tokens
 * TypeScript constants matching CSS custom properties
 * Use for React Native and JS-based styling
 */

// ============================================
// COLOR TOKENS - 10 Voxel Colors
// ============================================
export const colors = {
	grass: "#5d9b47",
	stone: "#7f7f7f",
	lava: "#cf4913",
	water: "#3f76e4",
	diamond: "#4aedd9",
	obsidian: "#1d1d21",
	gold: "#fcdb43",
	ember: "#ff6b35",
	cobble: "#535353",
	redstone: "#aa0f01",
} as const;

// Semantic color aliases
export const semanticColors = {
	bg: colors.obsidian,
	fg: colors.stone,
	accent: colors.diamond,
	success: colors.grass,
	warning: colors.gold,
	danger: colors.redstone,
	info: colors.water,
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================
export const fonts = {
	heading: "VT323",
	body: "Space Mono",
	micro: "Press Start 2P",
} as const;

export const fontSizes = {
	xs: 10,
	sm: 12,
	base: 14,
	lg: 16,
	xl: 20,
	"2xl": 24,
	"3xl": 32,
	"4xl": 40,
} as const;

export const lineHeights = {
	none: 1,
	tight: 1.25,
	normal: 1.5,
	relaxed: 1.75,
} as const;

// ============================================
// SHADOW TOKENS
// ============================================
export const shadows = {
	voxel: {
		shadowColor: "#000000",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 0,
		elevation: 4,
	},
	voxelSm: {
		shadowColor: "#000000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 0,
		elevation: 2,
	},
	voxelLg: {
		shadowColor: "#000000",
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 1,
		shadowRadius: 0,
		elevation: 6,
	},
} as const;

// CSS box-shadow strings for web
export const shadowsCSS = {
	voxel: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
	voxelSm: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
	voxelLg: "6px 6px 0px 0px rgba(0, 0, 0, 1)",
	voxelInset: "inset 2px 2px 0px 0px rgba(0, 0, 0, 0.3)",
} as const;

// ============================================
// BORDER & RADIUS TOKENS
// ============================================
export const borderRadius = {
	voxel: 4,
} as const;

export const borderWidth = {
	default: 2,
	thick: 4,
} as const;

// ============================================
// SPACING TOKENS
// ============================================
export const spacing = {
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	8: 32,
	10: 40,
	12: 48,
} as const;

// ============================================
// ANIMATION TOKENS
// ============================================
export const durations = {
	instant: 0,
	fast: 150,
	normal: 300,
	slow: 500,
	pulse: 1500,
} as const;

// ============================================
// BREAKPOINT TOKENS
// ============================================
export const breakpoints = {
	sm: 640,
	md: 1024,
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type VoxelColor = keyof typeof colors;
export type SemanticColor = keyof typeof semanticColors;
export type FontFamily = keyof typeof fonts;
export type FontSize = keyof typeof fontSizes;
export type Spacing = keyof typeof spacing;
export type Breakpoint = keyof typeof breakpoints;
