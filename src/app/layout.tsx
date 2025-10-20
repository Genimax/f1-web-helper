import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/shared/lib/store/StoreProvider";
import "./globals.scss";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "F1 Web Helper | Formula 1 Information Portal",
    description:
        "Comprehensive Formula 1 information portal with standings, schedules, and championship calculator",
    keywords: [
        "Formula 1",
        "F1",
        "racing",
        "championship",
        "standings",
        "schedule",
    ],
    authors: [{ name: "Max Kolosov", url: "https://github.com/Genimax" }],
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                {/* Preload Formula 1 Display font */}
                <link
                    rel="preload"
                    href="/fonts/formula1-display-regular.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
