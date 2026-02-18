/**
 * VoxelButtonDemo - Demo component for visual parity testing
 *
 * This component demonstrates the voxel UI styling system
 * and can be used to verify visual consistency between web and mobile.
 *
 * Web Usage:
 *   import '@mealcraft/ui/tokens.css';
 *   import { VoxelButtonDemo } from '@mealcraft/ui';
 *
 * React Native Usage:
 *   import { VoxelButtonDemoNative } from '@mealcraft/ui';
 */

import type { CSSProperties, ReactNode } from "react";

import {
	borderRadius,
	colors,
	fontSizes,
	fonts,
	shadowsCSS,
	spacing,
} from "./tokens";

// ============================================
// WEB COMPONENT
// ============================================

interface VoxelButtonProps {
	children: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	size?: "sm" | "md" | "lg";
	variant?: "primary" | "secondary" | "danger";
}

/**
 * VoxelButton - Web version using CSS classes
 * Requires tokens.css to be imported
 */
export function VoxelButton({
	children,
	variant = "primary",
	size = "md",
	onClick,
	disabled = false,
}: VoxelButtonProps) {
	const variantColors = {
		primary: { bg: "bg-grass", text: "text-obsidian", border: "border-grass" },
		secondary: {
			bg: "bg-stone",
			text: "text-obsidian",
			border: "border-stone",
		},
		danger: { bg: "bg-redstone", text: "text-gold", border: "border-redstone" },
	};

	const sizeClasses = {
		sm: "px-3 py-1 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const v = variantColors[variant];

	return (
		<button
			className={`
        ${v.bg} ${v.text}font-heading rounded-voxel border-2 shadow-voxel ${v.border}
        ${sizeClasses[size]}transition-transform hover:brightness-110 active:animate-depress disabled:cursor-not-allowed disabled:opacity-50`}
			disabled={disabled}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

// ============================================
// INLINE STYLES VERSION (for comparison)
// ============================================

/**
 * VoxelButtonInline - Uses inline styles for framework-agnostic usage
 * Does not require tokens.css
 */
export function VoxelButtonInline({
	children,
	variant = "primary",
	size = "md",
	onClick,
	disabled = false,
}: VoxelButtonProps) {
	const variantStyles: Record<
		string,
		{ bg: string; text: string; border: string }
	> = {
		primary: { bg: colors.grass, text: colors.obsidian, border: colors.grass },
		secondary: {
			bg: colors.stone,
			text: colors.obsidian,
			border: colors.stone,
		},
		danger: { bg: colors.redstone, text: colors.gold, border: colors.redstone },
	};

	const sizeStyles: Record<
		string,
		{ px: number; py: number; fontSize: number }
	> = {
		sm: { px: spacing[3], py: spacing[1], fontSize: fontSizes.sm },
		md: { px: spacing[4], py: spacing[2], fontSize: fontSizes.base },
		lg: { px: spacing[6], py: spacing[3], fontSize: fontSizes.lg },
	};

	const v = variantStyles[variant];
	const s = sizeStyles[size];

	const style: CSSProperties = {
		backgroundColor: v.bg,
		color: v.text,
		borderColor: v.border,
		borderWidth: 2,
		borderStyle: "solid",
		borderRadius: borderRadius.voxel,
		boxShadow: shadowsCSS.voxel,
		fontFamily: fonts.heading,
		fontSize: s.fontSize,
		paddingLeft: s.px,
		paddingRight: s.px,
		paddingTop: s.py,
		paddingBottom: s.py,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? 0.5 : 1,
		transition: "transform 0.15s ease-in-out",
	};

	return (
		<button disabled={disabled} onClick={onClick} style={style} type="button">
			{children}
		</button>
	);
}

// ============================================
// DEMO CARD COMPONENT
// ============================================

/**
 * VoxelCard - Demo card component
 */
export function VoxelCard({
	children,
	title,
}: {
	children: ReactNode;
	title?: string;
}) {
	return (
		<div className="rounded-voxel border-2 border-stone bg-cobble p-4 shadow-voxel">
			{title && (
				<h3 className="mb-3 font-heading text-diamond text-xl">{title}</h3>
			)}
			<div className="font-body text-stone">{children}</div>
		</div>
	);
}

// ============================================
// FULL DEMO COMPONENT
// ============================================

/**
 * VoxelButtonDemo - Full demo showing all variants and sizes
 *
 * Layout Notes for Visual Parity:
 * ┌─────────────────────────────────────────┐
 * │  VOXEL UI DEMO (VT323 heading)          │
 * ├─────────────────────────────────────────┤
 * │  ┌─────────────────────────────────┐    │
 * │  │ Primary Buttons                 │    │
 * │  │ [SM] [MD] [LG]                  │    │
 * │  └─────────────────────────────────┘    │
 * │  ┌─────────────────────────────────┐    │
 * │  │ Secondary Buttons               │    │
 * │  │ [SM] [MD] [LG]                  │    │
 * │  └─────────────────────────────────┘    │
 * │  ┌─────────────────────────────────┐    │
 * │  │ Danger Buttons                  │    │
 * │  │ [SM] [MD] [LG]                  │    │
 * │  └─────────────────────────────────┘    │
 * │                                         │
 * │  Color Swatches:                        │
 * │  [grass][stone][lava][water][diamond]  │
 * │  [obsidian][gold][ember][cobble][red]  │
 * └─────────────────────────────────────────┘
 *
 * Visual Parity Checklist:
 * - [ ] Shadow offset: 4px right, 4px down, solid black
 * - [ ] Border radius: 4px on all corners
 * - [ ] Font: VT323 for headings, Space Mono for body
 * - [ ] Colors match hex values exactly
 * - [ ] Button padding consistent across sizes
 * - [ ] Active state shows 0.95 scale transform
 */
export function VoxelButtonDemo() {
	return (
		<div className="min-h-screen bg-obsidian p-6">
			<h1 className="mb-6 font-heading text-4xl text-diamond">VOXEL UI DEMO</h1>

			<div className="space-y-6">
				{/* Primary Buttons */}
				<VoxelCard title="Primary Buttons">
					<div className="flex flex-wrap gap-4">
						<VoxelButton size="sm" variant="primary">
							Small
						</VoxelButton>
						<VoxelButton size="md" variant="primary">
							Medium
						</VoxelButton>
						<VoxelButton size="lg" variant="primary">
							Large
						</VoxelButton>
					</div>
				</VoxelCard>

				{/* Secondary Buttons */}
				<VoxelCard title="Secondary Buttons">
					<div className="flex flex-wrap gap-4">
						<VoxelButton size="sm" variant="secondary">
							Small
						</VoxelButton>
						<VoxelButton size="md" variant="secondary">
							Medium
						</VoxelButton>
						<VoxelButton size="lg" variant="secondary">
							Large
						</VoxelButton>
					</div>
				</VoxelCard>

				{/* Danger Buttons */}
				<VoxelCard title="Danger Buttons">
					<div className="flex flex-wrap gap-4">
						<VoxelButton size="sm" variant="danger">
							Small
						</VoxelButton>
						<VoxelButton size="md" variant="danger">
							Medium
						</VoxelButton>
						<VoxelButton size="lg" variant="danger">
							Large
						</VoxelButton>
					</div>
				</VoxelCard>

				{/* Color Swatches */}
				<VoxelCard title="Color Palette">
					<div className="grid grid-cols-5 gap-2">
						<div className="h-12 rounded-voxel bg-grass shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-stone shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-lava shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-water shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-diamond shadow-voxel-sm" />
						<div className="h-12 rounded-voxel border border-stone bg-obsidian shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-gold shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-ember shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-cobble shadow-voxel-sm" />
						<div className="h-12 rounded-voxel bg-redstone shadow-voxel-sm" />
					</div>
				</VoxelCard>

				{/* Typography Sample */}
				<VoxelCard title="Typography">
					<div className="space-y-2">
						<p className="font-heading text-2xl text-diamond">
							VT323 - Headings & Labels
						</p>
						<p className="font-body text-base text-stone">
							Space Mono - Body text and paragraphs
						</p>
						<p className="font-micro text-ember text-xs uppercase tracking-wider">
							Press Start 2P - Micro Labels
						</p>
					</div>
				</VoxelCard>
			</div>
		</div>
	);
}

export default VoxelButtonDemo;
