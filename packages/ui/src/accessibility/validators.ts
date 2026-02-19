/**
 * WCAG 2.1 Contrast Validation Utilities
 * Calculate and validate color contrast ratios
 */

import { WCAG_AA_LARGE, WCAG_AA_NORMAL } from "./contrast-matrix";

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): [number, number, number] {
	const normalized = hex.replace("#", "");
	const bigint = Number.parseInt(normalized, 16);
	// biome-ignore lint/suspicious/noBitwiseOperators: Intentional bitwise ops for hex color parsing
	const r = (bigint >> 16) & 255;
	// biome-ignore lint/suspicious/noBitwiseOperators: Intentional bitwise ops for hex color parsing
	const g = (bigint >> 8) & 255;
	// biome-ignore lint/suspicious/noBitwiseOperators: Intentional bitwise ops for hex color parsing
	const b = bigint & 255;
	return [r, g, b];
}

/**
 * Calculate relative luminance per WCAG 2.1
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function relativeLuminance(hex: string): number {
	const [r, g, b] = hexToRgb(hex);

	const toLinear = (c: number): number => {
		const sRGB = c / 255;
		return sRGB <= 0.039_28 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4;
	};

	return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function contrastRatio(hex1: string, hex2: string): number {
	const l1 = relativeLuminance(hex1);
	const l2 = relativeLuminance(hex2);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast meets WCAG AA requirements
 */
export function meetsWCAG_AA(
	ratio: number,
	textSize: "normal" | "large"
): boolean {
	return textSize === "large"
		? ratio >= WCAG_AA_LARGE
		: ratio >= WCAG_AA_NORMAL;
}

/**
 * Get WCAG compliance level for a contrast ratio
 */
export function getComplianceLevel(
	ratio: number
): "fail" | "large-only" | "all" {
	if (ratio >= WCAG_AA_NORMAL) {
		return "all";
	}
	if (ratio >= WCAG_AA_LARGE) {
		return "large-only";
	}
	return "fail";
}

/**
 * Validate a color pairing and return detailed results
 */
export interface ContrastValidation {
	largeTextCompliant: boolean;
	level: "fail" | "large-only" | "all";
	normalTextCompliant: boolean;
	ratio: number;
}

export function validateContrast(
	foregroundHex: string,
	backgroundHex: string
): ContrastValidation {
	const ratio = contrastRatio(foregroundHex, backgroundHex);
	return {
		ratio: Math.round(ratio * 100) / 100,
		normalTextCompliant: ratio >= WCAG_AA_NORMAL,
		largeTextCompliant: ratio >= WCAG_AA_LARGE,
		level: getComplianceLevel(ratio),
	};
}

/**
 * Format contrast ratio for display
 */
export function formatRatio(ratio: number): string {
	return `${ratio.toFixed(2)}:1`;
}
