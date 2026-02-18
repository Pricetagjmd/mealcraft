import type { Metadata } from "next";

import {
	Geist,
	Geist_Mono,
	Press_Start_2P,
	Space_Mono,
	VT323,
} from "next/font/google";

import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const vt323 = VT323({
	weight: "400",
	variable: "--font-vt323",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	weight: ["400", "700"],
	variable: "--font-space-mono",
	subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
	weight: "400",
	variable: "--font-press-start-2p",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "mealcraft",
	description: "mealcraft",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} ${spaceMono.variable} ${pressStart2P.variable} antialiased`}
			>
				<Providers>
					<div className="grid h-svh grid-rows-[auto_1fr]">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
