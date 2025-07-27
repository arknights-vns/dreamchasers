"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

// Reusable component for individual dropdown items
function DropdownItem({
    href,
    children,
    pathname,
}: {
    href: string;
    children: React.ReactNode;
    pathname: string;
}) {
    return (
        <li>
            <Link
                className={classNames({
                    "bg-black text-white": pathname === href,
                    "text-black": pathname !== href,
                })}
                href={href}
            >
                {children}
            </Link>
        </li>
    );
}

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
        <li>
            <details>
                <summary>{title}</summary>
                <ul>
                    {items.map(item => (
                        <DropdownItem key={item.href} href={item.href} pathname={pathname}>
                            {item.label}
                        </DropdownItem>
                    ))}
                </ul>
            </details>
        </li>
    );
}

// Reusable component for desktop dropdown menus
function DesktopDropdown({
    title,
    items,
    pathname,
    pathPrefix,
}: {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
    pathPrefix: string;
}) {
    return (
        <div className={"dropdown-hover group dropdown"}>
            <div
                className={classNames(
                    "relative rounded-md py-2 text-lg font-bold transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-['']",
                    {
                        "font-bold text-black after:scale-x-100 after:bg-black":
                            pathname.includes(pathPrefix),
                        "text-black after:scale-x-0 after:bg-black hover:after:scale-x-100":
                            !pathname.includes(pathPrefix),
                    },
                )}
            >
                {title}
            </div>
            <div
                className={"invisible absolute top-full left-0 h-4 w-full group-hover:visible"}
            >
            </div>
            <ul
                className={"dropdown-content menu mt-4 w-52 rounded-box bg-white p-2 shadow-sm"}
                tabIndex={0}
            >
                {items.map(item => (
                    <DropdownItem key={item.href} href={item.href} pathname={pathname}>
                        {item.label}
                    </DropdownItem>
                ))}
            </ul>
        </div>
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
                    <li key={link.name}>
                        <Link
                            className={classNames({
                                "bg-black text-white": pathname === link.href,
                                "text-black": pathname !== link.href,
                            })}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </>
        );
    }

    return (
        <div
            className={"relative hidden cursor-pointer items-center gap-4 text-base font-semibold text-black lg:flex"}
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
            <NavDivider width={"w-32"} />
        </div>
    );
}
