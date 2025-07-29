"use client";

import type { ComponentProps } from "react";
import { ThemeProvider } from "next-themes";

export function TerraTheme({
    children,
    ...props
}: ComponentProps<typeof ThemeProvider>) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
