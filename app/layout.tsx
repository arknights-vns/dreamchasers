import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Quicksand as VNS_Font } from "next/font/google";
import NavBar from "@/components/navbar/NavBar";

import "./globals.css";

const mainFont = VNS_Font({
    variable: "--font-vns",
    subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://dreamchasers.akvns.org"),
    title: "Dreamchasers @ 2025",
    description: "For the Doctors, by the Doctors.",
    authors: [
        {
            name: "Trạm dừng chân chốn Terra",
            url: "https://facebook.com/terrastationvn",
        },
        {
            name: "VNS Dev Squad",
            url: "https://github.com/arknights-vns",
        },
    ],
    openGraph: {
        url: "https://dreamchasers.akvns.org",
        title: "Dreamchasers @ 2025",
        siteName: "Arknights VNS - Dreamchasers",
        description: "For the Doctors, by the Doctors.",
        countryName: "Vietnam",
        locale: "vi-VN",
    },
};

export const viewport: Viewport = {
    colorScheme: "only light",
    initialScale: 1.0,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang={"en"} data-theme={"light"}>
            <body className={`${mainFont.variable} font-[family-name:var(--font-vns)] antialiased`}>
                <NavBar />
                <div>{children}</div>
            </body>
        </html>
    );
}
