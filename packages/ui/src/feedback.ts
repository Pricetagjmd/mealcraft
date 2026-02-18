/**
 * Haptic Feedback Patterns
 * Named constants for consistent haptic feedback across the app
 *
 * Usage:
 *   import { hapticLight, hapticMedium, triggerHaptic } from '@mealcraft/ui/feedback';
 *   triggerHaptic(hapticLight);
 */

// ============================================
// HAPTIC PATTERN DEFINITIONS
// ============================================

/**
 * Light haptic feedback - subtle tap sensation
 * Use for: toggles, selections, minor interactions
 */
export const hapticLight = {
	type: "impact" as const,
	style: "light" as const,
	duration: 10,
	intensity: 0.5,
} as const;

/**
 * Medium haptic feedback - noticeable tap sensation
 * Use for: button presses, confirmations, successful actions
 */
export const hapticMedium = {
	type: "impact" as const,
	style: "medium" as const,
	duration: 20,
	intensity: 0.7,
} as const;

/**
 * Heavy haptic feedback - strong tap sensation
 * Use for: errors, warnings, significant state changes
 */
export const hapticHeavy = {
	type: "impact" as const,
	style: "heavy" as const,
	duration: 30,
	intensity: 1.0,
} as const;

/**
 * Selection haptic - very light feedback for list selections
 * Use for: picker selections, list item selections
 */
export const hapticSelection = {
	type: "selection" as const,
	style: "selection" as const,
	duration: 5,
	intensity: 0.3,
} as const;

/**
 * Success haptic pattern - double tap for positive feedback
 * Use for: successful operations, completed tasks
 */
export const hapticSuccess = {
	type: "notification" as const,
	style: "success" as const,
	pattern: [0, 50, 100, 50] as const,
	intensity: 0.6,
} as const;

/**
 * Error haptic pattern - sharp vibration for errors
 * Use for: validation errors, failed operations
 */
export const hapticError = {
	type: "notification" as const,
	style: "error" as const,
	pattern: [0, 100, 50, 100, 50, 100] as const,
	intensity: 0.9,
} as const;

/**
 * Warning haptic pattern - attention-grabbing feedback
 * Use for: warnings, confirmations requiring attention
 */
export const hapticWarning = {
	type: "notification" as const,
	style: "warning" as const,
	pattern: [0, 75, 100, 75] as const,
	intensity: 0.75,
} as const;

// ============================================
// HAPTIC TYPES
// ============================================

export type HapticImpact =
	| typeof hapticLight
	| typeof hapticMedium
	| typeof hapticHeavy;
export type HapticSelection = typeof hapticSelection;
export type HapticNotification =
	| typeof hapticSuccess
	| typeof hapticError
	| typeof hapticWarning;
export type HapticPattern = HapticImpact | HapticSelection | HapticNotification;

// ============================================
// HAPTIC TRIGGER HELPER
// ============================================

/**
 * Platform-agnostic haptic trigger
 * Implement platform-specific logic in your app
 *
 * React Native (Expo):
 *   import * as Haptics from 'expo-haptics';
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *
 * Web (if supported):
 *   navigator.vibrate(pattern.duration);
 */
export function triggerHaptic(
	pattern: HapticPattern,
	options?: { enabled?: boolean }
): void {
	// Skip if haptics disabled
	if (options?.enabled === false) {
		return;
	}

	// Web fallback using Vibration API
	if (typeof navigator !== "undefined" && "vibrate" in navigator) {
		if (pattern.type === "notification" && "pattern" in pattern) {
			navigator.vibrate(pattern.pattern as number[]);
		} else {
			navigator.vibrate(pattern.duration);
		}
	}

	// Note: For React Native, use expo-haptics or react-native-haptic-feedback
	// This function provides type safety; actual implementation depends on platform
}

// ============================================
// HAPTIC HOOK HELPER (for React)
// ============================================

/**
 * Creates a memoized haptic callback
 * Usage in React Native:
 *
 * const onPress = useHapticCallback(hapticMedium, () => {
 *   // your action
 * });
 */
export function createHapticCallback<T extends (...args: unknown[]) => unknown>(
	pattern: HapticPattern,
	callback: T,
	options?: { enabled?: boolean }
): T {
	return ((...args: Parameters<T>) => {
		triggerHaptic(pattern, options);
		return callback(...args);
	}) as T;
}

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
	light: hapticLight,
	medium: hapticMedium,
	heavy: hapticHeavy,
	selection: hapticSelection,
	success: hapticSuccess,
	error: hapticError,
	warning: hapticWarning,
};
