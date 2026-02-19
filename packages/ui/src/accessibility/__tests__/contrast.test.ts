import { describe, expect, it } from "vitest";
import { colors } from "../../tokens";
import {
	colorRestrictions,
	compliantPairings,
	getCompliantTextColors,
	isPairingCompliant,
	WCAG_AA_LARGE,
	WCAG_AA_NORMAL,
} from "../contrast-matrix";
import {
	contrastRatio,
	getComplianceLevel,
	meetsWCAG_AA,
	validateContrast,
} from "../validators";

describe("WCAG AA Contrast Compliance", () => {
	describe("Color Token Values", () => {
		it("has correct hex values for updated colors", () => {
			expect(colors.obsidian).toBe("#1A1A1A");
			expect(colors.grass).toBe("#5D8E22");
			expect(colors.stone).toBe("#7E7E7E");
			expect(colors.sky).toBe("#C4E5F2");
			expect(colors.white).toBe("#FFFFFF");
		});
	});

	describe("Contrast Ratio Calculations", () => {
		it("calculates white on obsidian correctly (~16.1:1)", () => {
			const ratio = contrastRatio(colors.white, colors.obsidian);
			expect(ratio).toBeGreaterThan(16);
			expect(ratio).toBeLessThan(17);
		});

		it("calculates white on stone correctly (~4.0:1)", () => {
			const ratio = contrastRatio(colors.white, colors.stone);
			expect(ratio).toBeGreaterThan(3.9);
			expect(ratio).toBeLessThan(4.2);
		});

		it("calculates obsidian on sky correctly (~12.8:1)", () => {
			const ratio = contrastRatio(colors.obsidian, colors.sky);
			expect(ratio).toBeGreaterThan(12);
			expect(ratio).toBeLessThan(14);
		});

		it("calculates grass on white correctly (~3.4:1)", () => {
			const ratio = contrastRatio(colors.grass, colors.white);
			expect(ratio).toBeGreaterThan(3.2);
			expect(ratio).toBeLessThan(3.6);
		});
	});

	describe("WCAG AA Compliance Checks", () => {
		it("white on obsidian meets AA for normal text", () => {
			const ratio = contrastRatio(colors.white, colors.obsidian);
			expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
			expect(meetsWCAG_AA(ratio, "normal")).toBe(true);
		});

		it("white on stone meets AA for large text only", () => {
			const ratio = contrastRatio(colors.white, colors.stone);
			expect(ratio).toBeLessThan(WCAG_AA_NORMAL);
			expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
			expect(meetsWCAG_AA(ratio, "large")).toBe(true);
			expect(meetsWCAG_AA(ratio, "normal")).toBe(false);
		});

		it("grass on white meets AA for large text only", () => {
			const ratio = contrastRatio(colors.grass, colors.white);
			expect(ratio).toBeLessThan(WCAG_AA_NORMAL);
			expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
			expect(meetsWCAG_AA(ratio, "large")).toBe(true);
			expect(meetsWCAG_AA(ratio, "normal")).toBe(false);
		});

		it("obsidian on sky meets AA for normal text", () => {
			const ratio = contrastRatio(colors.obsidian, colors.sky);
			expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
			expect(meetsWCAG_AA(ratio, "normal")).toBe(true);
		});
	});

	describe("Color Restrictions", () => {
		it("stone surfaces only allow white text", () => {
			expect(colorRestrictions.stone.allowedTextColors).toContain("white");
			expect(colorRestrictions.stone.forbiddenTextColors).toContain("obsidian");
		});

		it("obsidian text on stone fails normal AA", () => {
			const ratio = contrastRatio(colors.obsidian, colors.stone);
			expect(ratio).toBeLessThan(WCAG_AA_NORMAL);
		});

		it("grass is restricted to large text only", () => {
			expect(colorRestrictions.grass.usage).toBe("large-text-only");
			expect(colorRestrictions.grass.minFontSizePx).toBe(18);
			expect(colorRestrictions.grass.minBoldFontSizePx).toBe(14);
		});
	});

	describe("Compliant Pairings", () => {
		it("all pairings in matrix have valid ratios", () => {
			for (const pairing of compliantPairings) {
				const calculatedRatio = contrastRatio(pairing.fgHex, pairing.bgHex);
				const expectedLevel = getComplianceLevel(calculatedRatio);

				expect(pairing.level).toBe(expectedLevel);

				if (pairing.level === "all") {
					expect(calculatedRatio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
				} else if (pairing.level === "large-only") {
					expect(calculatedRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
					expect(calculatedRatio).toBeLessThan(WCAG_AA_NORMAL);
				}
			}
		});

		it("getCompliantTextColors returns correct colors for obsidian background", () => {
			const normalTextColors = getCompliantTextColors("obsidian", "normal");
			expect(normalTextColors).toContain("white");
			expect(normalTextColors).toContain("gold");
			expect(normalTextColors).toContain("diamond");
		});

		it("getCompliantTextColors returns additional colors for large text on stone", () => {
			const normalTextColors = getCompliantTextColors("stone", "normal");
			const largeTextColors = getCompliantTextColors("stone", "large");

			expect(normalTextColors).not.toContain("white");
			expect(largeTextColors).toContain("white");
		});
	});

	describe("Validation Utilities", () => {
		it("validateContrast returns complete information", () => {
			const result = validateContrast(colors.white, colors.obsidian);

			expect(result.ratio).toBeGreaterThan(16);
			expect(result.normalTextCompliant).toBe(true);
			expect(result.largeTextCompliant).toBe(true);
			expect(result.level).toBe("all");
		});

		it("validateContrast identifies large-only compliance", () => {
			const result = validateContrast(colors.white, colors.stone);

			expect(result.normalTextCompliant).toBe(false);
			expect(result.largeTextCompliant).toBe(true);
			expect(result.level).toBe("large-only");
		});

		it("isPairingCompliant works correctly", () => {
			expect(isPairingCompliant("white", "obsidian", "normal")).toBe(true);
			expect(isPairingCompliant("white", "stone", "normal")).toBe(false);
			expect(isPairingCompliant("white", "stone", "large")).toBe(true);
			expect(isPairingCompliant("grass", "sky", "normal")).toBe(false);
			expect(isPairingCompliant("grass", "sky", "large")).toBe(true);
		});
	});
});
