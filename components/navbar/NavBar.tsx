"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuSparkle } from "react-icons/lu";
import PurchaseTicketButton from "@/components/PreviewTicketButton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DRCH_Logo from "@/public/DRCH_Logo.png";
import NavBarItems from "./NavBarItems";

export default function NavBar() {
    const pathname = usePathname();

    const doNotShow = [
        "/contest/banned",
        "/contest/democracy",
        "/contest/standing",
        "/admin",
    ];

    let visualStyle = "flex";

    if (doNotShow.includes(pathname)) {
        visualStyle = "hidden";
    }

    return (
        <header className={`sticky top-0 z-50 ${visualStyle} h-20 w-screen bg-white px-4`}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className={"mr-4 self-center lg:hidden"} size={"icon"} variant={"outline"}>
                        <GiHamburgerMenu />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <div className={"mt-2 ml-4 grid gap-2 py-6"}>
                        <NavBarItems isMobile />
                    </div>
                </SheetContent>
            </Sheet>
            <Link className={"m-2 flex items-center space-x-4"} href={"/"} prefetch={false}>
                <Image alt={"DRCH_Logo"} className={"size-[50px]"} src={DRCH_Logo} />
                <span className={"hidden text-xl font-bold md:inline"}>Dreamchasers</span>
            </Link>
            <nav className={"ml-auto hidden gap-6 lg:flex"}>
                <NavBarItems />
            </nav>
            <div className={"ml-auto flex items-center space-x-2 lg:ml-0"}>
                <PurchaseTicketButton />
                <LuSparkle className={"hidden md:block"} fill={"#000000"} />
            </div>
        </header>
    );
}
