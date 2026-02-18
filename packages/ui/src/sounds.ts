/**
 * Sound Effect Asset Paths and Utilities
 * Centralized sound management with easy toggle integration
 *
 * Usage:
 *   import { sounds, playSound, SoundManager } from '@mealcraft/ui/sounds';
 *   playSound(sounds.click);
 */

// ============================================
// SOUND ASSET PATHS
// ============================================

/**
 * Sound effect asset paths
 * All paths are relative to the assets directory
 * Actual files should be placed in: assets/sounds/
 */
export const sounds = {
	// UI Interaction Sounds
	click: "/assets/sounds/click.mp3",
	toggle: "/assets/sounds/toggle.mp3",
	hover: "/assets/sounds/hover.mp3",
	select: "/assets/sounds/select.mp3",

	// Feedback Sounds
	success: "/assets/sounds/success.mp3",
	error: "/assets/sounds/error.mp3",
	warning: "/assets/sounds/warning.mp3",

	// Voxel-themed Sounds
	thud: "/assets/sounds/thud.mp3",
	fanfare: "/assets/sounds/fanfare.mp3",
	pickup: "/assets/sounds/pickup.mp3",
	drop: "/assets/sounds/drop.mp3",
	break: "/assets/sounds/break.mp3",
	place: "/assets/sounds/place.mp3",

	// Navigation Sounds
	open: "/assets/sounds/open.mp3",
	close: "/assets/sounds/close.mp3",
	swipe: "/assets/sounds/swipe.mp3",

	// Achievement/Reward Sounds
	levelUp: "/assets/sounds/level-up.mp3",
	achievement: "/assets/sounds/achievement.mp3",
	reward: "/assets/sounds/reward.mp3",
} as const;

export type SoundKey = keyof typeof sounds;
export type SoundPath = (typeof sounds)[SoundKey];

// ============================================
// SOUND CONFIGURATION
// ============================================

export interface SoundConfig {
	enabled: boolean;
	muted: boolean;
	volume: number; // 0.0 to 1.0
}

const defaultConfig: SoundConfig = {
	enabled: true,
	volume: 0.7,
	muted: false,
};

// ============================================
// SOUND MANAGER CLASS
// ============================================

/**
 * SoundManager - Manages sound playback with toggle support
 *
 * Usage:
 *   const manager = new SoundManager();
 *   manager.play(sounds.click);
 *   manager.setEnabled(false); // Disable all sounds
 */
export class SoundManager {
	private readonly config: SoundConfig;
	private readonly audioCache: Map<string, HTMLAudioElement> = new Map();

	constructor(config: Partial<SoundConfig> = {}) {
		this.config = { ...defaultConfig, ...config };
	}

	/**
	 * Enable or disable sound playback
	 */
	setEnabled(enabled: boolean): void {
		this.config.enabled = enabled;
	}

	/**
	 * Check if sounds are enabled
	 */
	isEnabled(): boolean {
		return this.config.enabled && !this.config.muted;
	}

	/**
	 * Set global volume (0.0 to 1.0)
	 */
	setVolume(volume: number): void {
		this.config.volume = Math.max(0, Math.min(1, volume));
	}

	/**
	 * Mute/unmute sounds
	 */
	setMuted(muted: boolean): void {
		this.config.muted = muted;
	}

	/**
	 * Toggle mute state
	 */
	toggleMute(): boolean {
		this.config.muted = !this.config.muted;
		return this.config.muted;
	}

	/**
	 * Get current configuration
	 */
	getConfig(): Readonly<SoundConfig> {
		return { ...this.config };
	}

	/**
	 * Play a sound effect
	 * Returns a promise that resolves when the sound finishes
	 */
	async play(path: SoundPath, options?: { volume?: number }): Promise<void> {
		if (!this.isEnabled()) {
			return;
		}

		// Web Audio API implementation
		if (typeof window !== "undefined" && "Audio" in window) {
			try {
				let audio = this.audioCache.get(path);

				if (!audio) {
					audio = new Audio(path);
					this.audioCache.set(path, audio);
				}

				audio.volume = (options?.volume ?? 1) * this.config.volume;
				audio.currentTime = 0;

				await audio.play();
			} catch (error) {
				// Silently fail if audio cannot be played
				// (e.g., user hasn't interacted with page yet)
				console.debug("Sound playback failed:", error);
			}
		}
	}

	/**
	 * Preload sounds for faster playback
	 */
	preload(paths: SoundPath[]): void {
		if (typeof window === "undefined" || !("Audio" in window)) {
			return;
		}

		for (const path of paths) {
			if (!this.audioCache.has(path)) {
				const audio = new Audio();
				audio.preload = "auto";
				audio.src = path;
				this.audioCache.set(path, audio);
			}
		}
	}

	/**
	 * Clear audio cache
	 */
	clearCache(): void {
		this.audioCache.clear();
	}
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let globalSoundManager: SoundManager | null = null;

/**
 * Get the global sound manager instance
 */
export function getSoundManager(): SoundManager {
	if (!globalSoundManager) {
		globalSoundManager = new SoundManager();
	}
	return globalSoundManager;
}

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

/**
 * Play a sound using the global manager
 */
export function playSound(
	path: SoundPath,
	options?: { volume?: number }
): Promise<void> {
	return getSoundManager().play(path, options);
}

/**
 * Enable/disable sounds globally
 */
export function setSoundsEnabled(enabled: boolean): void {
	getSoundManager().setEnabled(enabled);
}

/**
 * Check if sounds are enabled
 */
export function areSoundsEnabled(): boolean {
	return getSoundManager().isEnabled();
}

/**
 * Toggle sound mute state
 */
export function toggleSoundMute(): boolean {
	return getSoundManager().toggleMute();
}

/**
 * Set global sound volume
 */
export function setSoundVolume(volume: number): void {
	getSoundManager().setVolume(volume);
}

// ============================================
// REACT NATIVE HELPER
// ============================================

/**
 * For React Native, use expo-av or react-native-sound
 *
 * Example with expo-av:
 *
 * import { Audio } from 'expo-av';
 * import { sounds } from '@mealcraft/ui/sounds';
 *
 * const playNativeSound = async (path: string) => {
 *   const { sound } = await Audio.Sound.createAsync(
 *     require(path) // Note: requires bundler setup
 *   );
 *   await sound.playAsync();
 * };
 */
export const nativeSoundPaths = {
	click: require.resolve ? "./sounds/click.mp3" : sounds.click,
	toggle: require.resolve ? "./sounds/toggle.mp3" : sounds.toggle,
	thud: require.resolve ? "./sounds/thud.mp3" : sounds.thud,
	fanfare: require.resolve ? "./sounds/fanfare.mp3" : sounds.fanfare,
	success: require.resolve ? "./sounds/success.mp3" : sounds.success,
	error: require.resolve ? "./sounds/error.mp3" : sounds.error,
} as const;

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
	paths: sounds,
	manager: getSoundManager,
	play: playSound,
	setEnabled: setSoundsEnabled,
	isEnabled: areSoundsEnabled,
	toggleMute: toggleSoundMute,
	setVolume: setSoundVolume,
};
