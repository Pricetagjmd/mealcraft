/**
 * WCAG 2.1 AA Contrast Matrix
 * Documented color pairings for the Voxel Design System
 *
 * WCAG Requirements:
 * - Normal text (< 18px): 4.5:1 minimum
 * - Large text (>= 18px or >= 14px bold): 3.0:1 minimum
 */

export const WCAG_AA_NORMAL = 4.5;
export const WCAG_AA_LARGE = 3.0;

export type ContrastLevel = "fail" | "large-only" | "all";

export interface ColorPairing {
	background: string;
	bgHex: string;
	fgHex: string;
	foreground: string;
	level: ContrastLevel;
	ratio: number;
}

/**
 * All WCAG AA compliant color pairings
 * Sorted by contrast ratio (highest first)
 */
export const compliantPairings: ColorPairing[] = [
	// White foreground on dark backgrounds
	{
		foreground: "white",
		background: "obsidian",
		fgHex: "#FFFFFF",
		bgHex: "#1A1A1A",
		ratio: 16.1,
		level: "all",
	},
	{
		foreground: "white",
		background: "cobble",
		fgHex: "#FFFFFF",
		bgHex: "#535353",
		ratio: 7.36,
		level: "all",
	},
	{
		foreground: "white",
		background: "redstone",
		fgHex: "#FFFFFF",
		bgHex: "#aa0f01",
		ratio: 5.75,
		level: "all",
	},
	{
		foreground: "white",
		background: "water",
		fgHex: "#FFFFFF",
		bgHex: "#3f76e4",
		ratio: 4.68,
		level: "all",
	},
	{
		foreground: "white",
		background: "lava",
		fgHex: "#FFFFFF",
		bgHex: "#cf4913",
		ratio: 4.52,
		level: "all",
	},
	{
		foreground: "white",
		background: "stone",
		fgHex: "#FFFFFF",
		bgHex: "#7E7E7E",
		ratio: 4.0,
		level: "large-only",
	},

	// Obsidian foreground on light backgrounds
	{
		foreground: "obsidian",
		background: "white",
		fgHex: "#1A1A1A",
		bgHex: "#FFFFFF",
		ratio: 16.1,
		level: "all",
	},
	{
		foreground: "obsidian",
		background: "gold",
		fgHex: "#1A1A1A",
		bgHex: "#fcdb43",
		ratio: 13.1,
		level: "all",
	},
	{
		foreground: "obsidian",
		background: "sky",
		fgHex: "#1A1A1A",
		bgHex: "#C4E5F2",
		ratio: 12.8,
		level: "all",
	},
	{
		foreground: "obsidian",
		background: "diamond",
		fgHex: "#1A1A1A",
		bgHex: "#4aedd9",
		ratio: 10.9,
		level: "all",
	},
	{
		foreground: "obsidian",
		background: "ember",
		fgHex: "#1A1A1A",
		bgHex: "#ff6b35",
		ratio: 5.18,
		level: "all",
	},

	// Accent colors on obsidian background
	{
		foreground: "gold",
		background: "obsidian",
		fgHex: "#fcdb43",
		bgHex: "#1A1A1A",
		ratio: 13.1,
		level: "all",
	},
	{
		foreground: "diamond",
		background: "obsidian",
		fgHex: "#4aedd9",
		bgHex: "#1A1A1A",
		ratio: 10.9,
		level: "all",
	},
	{
		foreground: "ember",
		background: "obsidian",
		fgHex: "#ff6b35",
		bgHex: "#1A1A1A",
		ratio: 5.18,
		level: "all",
	},
	{
		foreground: "grass",
		background: "obsidian",
		fgHex: "#5D8E22",
		bgHex: "#1A1A1A",
		ratio: 4.74,
		level: "all",
	},

	// Grass foreground - LARGE TEXT ONLY
	{
		foreground: "grass",
		background: "white",
		fgHex: "#5D8E22",
		bgHex: "#FFFFFF",
		ratio: 3.4,
		level: "large-only",
	},
	{
		foreground: "grass",
		background: "sky",
		fgHex: "#5D8E22",
		bgHex: "#C4E5F2",
		ratio: 3.2,
		level: "large-only",
	},
];

/**
 * Color usage restrictions per WCAG requirements
 */
export const colorRestrictions = {
	stone: {
		allowedTextColors: ["white"] as const,
		forbiddenTextColors: ["obsidian"] as const,
		reason: "Stone surfaces must use white text exclusively (4.0:1 ratio)",
	},
	grass: {
		usage: "large-text-only" as const,
		minFontSizePx: 18,
		minBoldFontSizePx: 14,
		reason:
			"Grass is only for large text (>=18px or >=14px bold) on light backgrounds",
	},
} as const;

/**
 * Get compliant text colors for a given background
 */
export function getCompliantTextColors(
	background: string,
	textSize: "normal" | "large" = "normal"
): string[] {
	return compliantPairings
		.filter((p) => {
			if (p.background !== background) {
				return false;
			}
			if (textSize === "normal") {
				return p.level === "all";
			}
			return p.level === "all" || p.level === "large-only";
		})
		.map((p) => p.foreground);
}

/**
 * Get compliant background colors for a given text color
 */
export function getCompliantBackgrounds(
	foreground: string,
	textSize: "normal" | "large" = "normal"
): string[] {
	return compliantPairings
		.filter((p) => {
			if (p.foreground !== foreground) {
				return false;
			}
			if (textSize === "normal") {
				return p.level === "all";
			}
			return p.level === "all" || p.level === "large-only";
		})
		.map((p) => p.background);
}

/**
 * Check if a color pairing is compliant
 */
export function isPairingCompliant(
	foreground: string,
	background: string,
	textSize: "normal" | "large" = "normal"
): boolean {
	const pairing = compliantPairings.find(
		(p) => p.foreground === foreground && p.background === background
	);
	if (!pairing) {
		return false;
	}
	if (textSize === "normal") {
		return pairing.level === "all";
	}
	return pairing.level === "all" || pairing.level === "large-only";
}
