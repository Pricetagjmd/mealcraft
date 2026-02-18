import { createContext, type ReactNode, useContext, useState } from "react";
import { useColorScheme } from "react-native";

import { darkTheme, lightTheme } from "../theme";

export type Theme = typeof lightTheme;
export type ThemeMode = "system" | "light" | "dark";

interface ThemeContextValue {
	isDark: boolean;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemColorScheme = useColorScheme();
	const [mode, setMode] = useState<ThemeMode>("system");

	const isDark =
		mode === "system" ? systemColorScheme === "dark" : mode === "dark";
	const theme = isDark ? darkTheme : lightTheme;

	return (
		<ThemeContext.Provider value={{ theme, isDark, mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
