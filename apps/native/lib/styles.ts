/**
 * Pure React Native styling layer with theme support.
 * Provides a theme-aware StyleSheet.create and useStyles hook
 * using React Native's useColorScheme and safe area insets.
 */

import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { darkTheme, lightTheme } from "../theme";

type Theme = typeof lightTheme;

const defaultInsets = { top: 0, right: 0, bottom: 0, left: 0 };

const themeRef: { current: Theme } = { current: lightTheme };
const runtimeRef: { current: { insets: typeof defaultInsets } } = {
	current: { insets: defaultInsets },
};

function createStyleSheet() {
	return {
		create<T extends Record<string, unknown>>(
			fn: (theme: Theme, rt: { insets: typeof defaultInsets }) => T
		): T {
			return new Proxy({} as T, {
				get(_, key: string) {
					const theme = themeRef.current;
					const rt = runtimeRef.current;
					const out = fn(theme, rt);
					return out[key as keyof T];
				},
			});
		},
	};
}

export const StyleSheet = createStyleSheet();

export function useStyles() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	themeRef.current = colorScheme === "dark" ? darkTheme : lightTheme;
	runtimeRef.current = { insets };
	return { theme: themeRef.current };
}
