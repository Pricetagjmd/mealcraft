import { createContext, type ReactNode, useContext } from "react";

import { type VoxelTheme, voxelTheme } from "../theme";

interface ThemeContextValue {
	theme: VoxelTheme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeContext.Provider value={{ theme: voxelTheme }}>
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

export type { VoxelTheme as Theme };
