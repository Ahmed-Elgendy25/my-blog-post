// Import global styles and fonts

import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { PostHogProvider } from "@/lib/posthog/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html className={inter.className}>
            <head>
                <link rel="icon" href="/logo2.ico" sizes="any" />
            </head>
            <body>
                <PostHogProvider>{children}</PostHogProvider>
            </body>
        </html>
    );
}
