"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Reusable component for mobile dropdown sections
function MobileDropdownSection({
    title,
    items,
    pathname,
}: {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
}) {
    return (
        <details className={"py-2"}>
            <summary>{title}</summary>
            <div className={"flex flex-col gap-1"}>
                {items.map(item => (
                    <Link
                        key={item.href}
                        className={classNames(
                            "ml-8 px-3 py-2 rounded-md",
                            pathname === item.href ? "bg-black text-white" : "text-black",
                        )}
                        href={item.href}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </details>
    );
}

// Desktop dropdown using shadcn/ui DropdownMenu
type DesktopDropdownProps = {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
    pathPrefix: string;
};

function DesktopDropdown({ title, items, pathname, pathPrefix }: DesktopDropdownProps) {
    const active = pathname.includes(pathPrefix);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={classNames(
                        "relative cursor-pointer rounded-md py-1 text-lg font-bold transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-['']",
                        {
                            "font-bold text-black after:scale-x-100 after:bg-black": active,
                            "text-black after:scale-x-0 after:bg-black hover:after:scale-x-100": !active,
                        },
                    )}
                    type={"button"}
                >
                    {title}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"rounded-box mt-2 w-52 bg-white p-2 shadow-sm"}>
                {items.map(item => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link
                            className={classNames("block w-full px-2 my-1 rounded-md text-center cursor-pointer focus:bg-gray-300", {
                                "bg-black text-white": pathname === item.href,
                                "text-black": pathname !== item.href,
                            })}
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Reusable component for navigation links with underline animation
function NavLink({
    href,
    children,
    pathname,
}: {
    href: string;
    children: React.ReactNode;
    pathname: string;
}) {
    return (
        <Link
            className={classNames(
                "relative rounded-md py-2 transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-['']",
                {
                    "font-bold text-black after:scale-x-100 after:bg-black": pathname === href,
                    "text-black after:scale-x-0 after:bg-black hover:after:scale-x-100":
                        pathname !== href,
                },
            )}
            href={href}
        >
            <div className={"text-lg font-bold"}>{children}</div>
        </Link>
    );
}

// Reusable divider component
function NavDivider({ width = "w-8" }: { width?: string }) {
    return <div className={`h-0.5 ${width} bg-black`} />;
}

export default function NavBarItems({ isMobile = false }: { isMobile?: boolean }) {
    const links = [
        { name: "Tổ chức", href: "/crew" },
        { name: "Kỷ niệm", href: "/retro" },
        { name: "Tournament", href: "#" },
    ];

    const eventItems = [
        { href: "/event/roadmap", label: "Lịch trình" },
        { href: "/event/schedule", label: "Timeline sự kiện" },
        { href: "/event/location", label: "Địa điểm" },
        { href: "/event/rules", label: "Nội quy" },
    ];

    const pathname = usePathname();

    if (isMobile) {
        return (
            <>
                <MobileDropdownSection items={eventItems} pathname={pathname} title={"Sự kiện"} />
                {links.map(link => (
                    <Link
                        key={link.name}
                        className={classNames(
                            "px-3 py-2 rounded-md",
                            pathname === link.href ? "bg-black text-white" : "text-black",
                        )}
                        href={link.href}
                    >
                        {link.name}
                    </Link>
                ))}
            </>
        );
    }

    return (
        <div
            className={"mr-2 hidden cursor-pointer items-center gap-4 font-semibold text-black lg:flex"}
        >
            <DesktopDropdown
                items={eventItems}
                pathPrefix={"/event"}
                pathname={pathname}
                title={"Sự kiện"}
            />
            <NavDivider />
            {links.map((link, index) => (
                <Fragment key={link.name}>
                    {index !== 0 && <NavDivider />}
                    <NavLink href={link.href} pathname={pathname}>
                        {link.name}
                    </NavLink>
                </Fragment>
            ))}
            <NavDivider width={"w-28"} />
        </div>
    );
}
