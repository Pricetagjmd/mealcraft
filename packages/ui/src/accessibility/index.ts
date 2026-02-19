/**
 * Accessibility utilities for the Voxel Design System
 */

export {
	type ColorPairing,
	type ContrastLevel,
	colorRestrictions,
	compliantPairings,
	getCompliantBackgrounds,
	getCompliantTextColors,
	isPairingCompliant,
	WCAG_AA_LARGE,
	WCAG_AA_NORMAL,
} from "./contrast-matrix";

export {
	type ContrastValidation,
	contrastRatio,
	formatRatio,
	getComplianceLevel,
	hexToRgb,
	meetsWCAG_AA,
	relativeLuminance,
	validateContrast,
} from "./validators";
