/**
 * Voxel UI Design Tokens
 * TypeScript constants matching CSS custom properties
 * Use for React Native and JS-based styling
 */

// ============================================
// COLOR TOKENS - Voxel Palette (Design System 4.1)
// ============================================
export const colors = {
	grass: "#5D8E22",
	dirt: "#8B5E3C",
	sky: "#C4E5F2",
	stone: "#7E7E7E",
	obsidian: "#1A1A1A",
	lava: "#CF5C28",
	ember: "#E8913A",
	wood: "#A07449",
	cobble: "#B0B0B0",
	redstone: "#CC3333",
	water: "#3f76e4",
	diamond: "#4aedd9",
	gold: "#fcdb43",
	white: "#FFFFFF",
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

// Font sizes - WCAG 2.1 compliant (minimum 12px)
export const fontSizes = {
	// xs: 10 removed - fails WCAG minimum text size on mobile
	sm: 12, // Minimum allowed (decorative badges only)
	base: 14, // Body text, functional labels
	lg: 16,
	xl: 20,
	"2xl": 24,
	"3xl": 28, // Heading minimum
	"4xl": 32,
	"5xl": 40,
	"6xl": 42, // Heading maximum
} as const;

/**
 * Typography roles with WCAG-compliant constraints
 *
 * Original spec used Press Start 2P at 10px for labels - this fails
 * WCAG 2.1 minimum text size guidelines on mobile devices.
 * VT323 at 14px minimum replaces it for all functional labels.
 */
export const typography = {
	heading: {
		font: "VT323",
		minSize: 28,
		maxSize: 42,
		lineHeight: 1.25,
	},
	label: {
		font: "VT323", // NOT Press Start 2P - replaced for accessibility
		minSize: 14,
		textTransform: "uppercase" as const,
	},
	body: {
		font: "Space Mono",
		size: 14,
		lineHeight: 1.5,
	},
	micro: {
		font: "Press Start 2P",
		minSize: 12,
		usage: "decorative-badges-only" as const,
	},
} as const;

export const lineHeights = {
	none: 1,
	tight: 1.25,
	normal: 1.5,
	relaxed: 1.75,
} as const;

// ============================================
// SHADOW TOKENS - Hard edge, zero blur
// ============================================
export const shadows = {
	voxel: {
		shadowColor: "#000000",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.8, // Updated per spec
		shadowRadius: 0, // Hard edge, zero blur
		elevation: 4,
	},
	voxelSm: {
		shadowColor: "#000000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 0,
		elevation: 2,
	},
	voxelLg: {
		shadowColor: "#000000",
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 0.8,
		shadowRadius: 0,
		elevation: 6,
	},
} as const;

// CSS box-shadow strings for web - hard edge, zero blur
export const shadowsCSS = {
	voxel: "4px 4px 0px 0px rgba(0, 0, 0, 0.8)",
	voxelSm: "2px 2px 0px 0px rgba(0, 0, 0, 0.8)",
	voxelLg: "6px 6px 0px 0px rgba(0, 0, 0, 0.8)",
	voxelInset: "inset 2px 2px 0px 0px rgba(0, 0, 0, 0.3)",
	none: "none", // For disabled state
} as const;

// ============================================
// BORDER & RADIUS TOKENS
// ============================================
export const borderRadius = {
	voxel: 4, // 4px - voxel feel, not pill
} as const;

export const borderWidth = {
	default: 3, // 3px for interactive elements and cards
	thin: 2,
	thick: 4,
} as const;

// Interactive element border style
export const borderVoxel = {
	width: 3,
	style: "solid" as const,
	color: colors.obsidian, // #1A1A1A
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
// ============================================
// FOCUS INDICATOR TOKENS
// ============================================
export const focus = {
	color: colors.grass,
	width: 2,
	style: "dashed" as const,
	offset: 2,
} as const;

// React Native focus style
export const focusStyleRN = {
	borderWidth: 2,
	borderColor: colors.grass,
	borderStyle: "dashed" as const,
} as const;

// ============================================
// DISABLED STATE TOKENS (Cobble = disabled per spec)
// ============================================
export const disabled = {
	background: colors.cobble,
	opacity: 0.6,
	cursor: "not-allowed" as const,
	shadow: "none",
} as const;

// React Native disabled style
export const disabledStyleRN = {
	backgroundColor: colors.cobble,
	opacity: 0.6,
} as const;

// ============================================
// SKELETON/LOADING TOKENS
// ============================================
export const skeleton = {
	background: colors.stone, // #7E7E7E
	opacityMin: 0.4,
	opacityMax: 0.7,
	duration: 1500, // 1.5s loop
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
