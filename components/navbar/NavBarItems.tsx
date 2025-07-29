"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function MobileDropdown({
    title,
    items,
    pathname,
}: {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
}) {
    return (
        <details>
            <summary className={"mb-2"}>{title}</summary>
            <div className={"flex flex-col space-y-4"}>
                {items.map(item => (
                    <Link
                        key={item.href}
                        className={
                            classNames(
                                "ml-8 px-3 py-2",
                                { "bg-primary text-secondary font-bold": pathname === item.href },
                            )
                        }
                        href={item.href}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </details>
    );
}

type DesktopDropdownProps = {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
    pathPrefix: string;
};

function DesktopDropdown({ title, items, pathname, pathPrefix }: DesktopDropdownProps) {
    const active = pathname.startsWith(pathPrefix);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={
                        classNames(
                            "relative cursor-pointer rounded-md py-1 text-lg transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-['']",
                            {
                                "font-bold after:scale-x-100 after:bg-primary": active,
                                "after:scale-x-0 hover:after:scale-x-100": !active,
                            },
                        )
                    }
                    type={"button"}
                >
                    {title}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"rounded-box mt-1 w-52 bg-background p-2 shadow-lg"}>
                {items.map(item => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link
                            className={
                                classNames("block w-full px-2 my-1 rounded-md text-center cursor-pointer focus:bg-secondary", {
                                    "bg-primary text-secondary font-extrabold": pathname === item.href,
                                    "text-primary": pathname !== item.href,
                                })
                            }
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
            className={
                classNames(
                    "relative rounded-md py-2 transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-['']",
                    {
                        "font-bold after:scale-x-100 after:bg-primary": pathname === href,
                        "after:scale-x-0 after:bg-primary hover:after:scale-x-100": pathname !== href,
                    },
                )
            }
            href={href}
        >
            <div className={"text-lg"}>{children}</div>
        </Link>
    );
}

function NavDivider({ width = "w-8" }: { width?: string }) {
    return <div className={`h-0.5 ${width} bg-primary`} />;
}

export default function NavBarItems({ isMobile = false }: { isMobile?: boolean }) {
    const links = [
        { name: "Tổ chức", href: "/crew" },
        { name: "Kỷ niệm", href: "/retro" },
        { name: "Tournament", href: "/contest" },
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
            <div className={"flex flex-col space-y-4"}>
                <MobileDropdown items={eventItems} pathname={pathname} title={"Sự kiện"} />
                {links.map(link => (
                    <Link
                        key={link.name}
                        className={
                            classNames(
                                "px-3 py-2",
                                { "bg-primary text-background font-bold": pathname === link.href },
                            )
                        }
                        href={link.href}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <div className={"mr-1 hidden cursor-pointer items-center gap-3 lg:flex"}>
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
