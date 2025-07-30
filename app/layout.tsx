import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { Quicksand as VNS_Font } from "next/font/google";
import { BASE_URL } from "@/app/web-config";
import NavBar from "@/components/navbar/NavBar";
import { TerraTheme } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

const mainFont = VNS_Font({
    variable: "--font-vns",
    subsets: ["latin", "vietnamese"]
});

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: "Dreamchasers @ 2025",
    description: "For the Doctors, by the Doctors.",
    authors: [
        {
            name: "Trạm dừng chân chốn Terra",
            url: "https://facebook.com/terrastationvn"
        },
        {
            name: "VNS Dev Squad",
            url: "https://github.com/arknights-vns"
        }
    ],
    openGraph: {
        url: BASE_URL,
        title: "Dreamchasers @ 2025",
        siteName: "Arknights VNS - Dreamchasers",
        description: "For the Doctors, by the Doctors.",
        countryName: "Vietnam",
        locale: "vi-VN"
    }
};

export const viewport: Viewport = {
    colorScheme: "light dark",
    initialScale: 1.0
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang={"vn"} suppressHydrationWarning>
            <body className={clsx(`
                font-[family-name:var(--font-vns)]
                antialiased
            `, mainFont.variable)}
            >
                <TerraTheme
                    attribute={"class"}
                    defaultTheme={"light"}
                    disableTransitionOnChange
                    enableSystem
                >
                    <NavBar />
                    {children}
                    <Toaster position={"top-center"} richColors />
                </TerraTheme>
            </body>
        </html>
    );
}
