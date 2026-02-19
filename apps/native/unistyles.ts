/**
 * Unistyles Configuration
 * Voxel Design System theming with breakpoints
 */
import { StyleSheet } from "react-native-unistyles";

import { breakpoints } from "./breakpoints";
import { voxelTheme } from "./theme";

// Dark theme deferred to post-MVP per design spec
type AppBreakpoints = typeof breakpoints;
interface AppThemes {
	light: typeof voxelTheme;
}

declare module "react-native-unistyles" {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
	breakpoints,
	themes: { light: voxelTheme },
	settings: { adaptiveThemes: false },
});
