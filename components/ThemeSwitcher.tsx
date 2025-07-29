"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={"mr-2 bg-secondary"} size={"icon"} variant={"outline"}>
                    <Sun className={"size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"} />
                    <Moon className={"absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={"mt-1"}>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Sáng (bro...)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Tối
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    Theo cái máy
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
