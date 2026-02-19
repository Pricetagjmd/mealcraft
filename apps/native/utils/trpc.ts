import type { AppRouter } from "@mealcraft/api/routers/index";

import { env } from "@mealcraft/env/native";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { Platform } from "react-native";

export const queryClient = new QueryClient();

// Lazy-load auth-client so native modules (@better-auth/expo, expo-constants) are
// not loaded at app startup (avoids TurboModuleRegistry 'PlatformConstants' in Expo Go).
function getAuthCookie(): string | null {
	try {
		const { authClient } = require("@/lib/auth-client");
		return authClient.getCookie();
	} catch {
		return null;
	}
}

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${env.EXPO_PUBLIC_SERVER_URL}/trpc`,
			fetch:
				Platform.OS !== "web"
					? undefined
					: (url, options) =>
							fetch(url, {
								...options,
								credentials: "include",
							}),
			headers() {
				if (Platform.OS === "web") {
					return {};
				}
				const headers = new Map<string, string>();
				const cookies = getAuthCookie();
				if (cookies) {
					headers.set("Cookie", cookies);
				}
				return Object.fromEntries(headers);
			},
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
