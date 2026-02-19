/**
 * Voxel Design System Animation Utilities
 * Uses react-native-reanimated for smooth animations
 */

import { durations } from "@mealcraft/ui/tokens";
import {
	Easing,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

/**
 * Shake animation (0.3s ease-in-out)
 * Horizontal oscillation for error feedback
 * @param value - Starting X position
 */
export function shake(value: number) {
	return withSequence(
		withTiming(value - 4, { duration: 50, easing: Easing.inOut(Easing.ease) }),
		withTiming(value + 4, { duration: 50, easing: Easing.inOut(Easing.ease) }),
		withTiming(value - 4, { duration: 50, easing: Easing.inOut(Easing.ease) }),
		withTiming(value + 4, { duration: 50, easing: Easing.inOut(Easing.ease) }),
		withTiming(value, { duration: 100, easing: Easing.inOut(Easing.ease) })
	);
}

/**
 * Depress animation config (0.15s ease)
 * For button press feedback - translateY down, remove shadow
 */
export const depress = {
	duration: durations.fast, // 150ms
	translateY: 2,
	shadowOpacity: 0,
} as const;

/**
 * Pulse animation (1.5s ease-in-out infinite)
 * For skeleton loading and attention states
 * @returns Animation that pulses opacity between 0.4 and 0.7
 */
export function pulse() {
	return withRepeat(
		withSequence(
			withTiming(0.7, { duration: 750, easing: Easing.inOut(Easing.ease) }),
			withTiming(0.4, { duration: 750, easing: Easing.inOut(Easing.ease) })
		),
		-1, // infinite
		true // reverse
	);
}

/**
 * Skeleton pulse animation
 * Same as pulse - used for loading skeleton components
 * Stone (#7E7E7E) background with pulsing opacity
 */
export const skeletonPulse = pulse;

/**
 * Animation configuration constants
 * For use in theme and component setup
 */
export const animationConfig = {
	shake: {
		duration: 300,
		amplitude: 4,
		easing: "ease-in-out" as const,
	},
	depress: {
		duration: durations.fast,
		translateY: 2,
	},
	pulse: {
		duration: durations.pulse,
		opacityMin: 0.4,
		opacityMax: 0.7,
	},
	skeleton: {
		duration: durations.pulse,
		opacityMin: 0.4,
		opacityMax: 0.7,
	},
} as const;
