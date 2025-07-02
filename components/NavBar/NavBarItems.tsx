"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import Text from "../Text/Text";

export default function NavBarItems({ isMobile = false }: { isMobile?: boolean }) {
    const links = [
        { name: "Tổ chức", href: "/crew" },
        { name: "Kỷ niệm", href: "/retro" },
    ];

    const pathname = usePathname();

    if (isMobile) {
        return (
            <>
                <li>
                    <details>
                        <summary>Sự kiện</summary>
                        <ul>
                            <li>
                                <Link href={"/event/timeline"}>Timeline</Link>
                            </li>
                            <li>
                                <Link href={"/event/schedule"}>Lịch trình</Link>
                            </li>
                            <li>
                                <Link href={"/event/location"}>Địa điểm</Link>
                            </li>
                        </ul>
                    </details>
                </li>
                {links.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href}>{link.name}</Link>
                    </li>
                ))}
                <li>
                    <details>
                        <summary>Tournament</summary>
                        <ul>
                            <li>
                                <Link href={"/tournament/overview"}>Giới thiệu</Link>
                            </li>
                            <li>
                                <Link href={"/tournament/rules"}>Luật chơi</Link>
                            </li>
                            <li>
                                <Link href={"/tournament/prizes"}>Giải thưởng</Link>
                            </li>
                        </ul>
                    </details>
                </li>
            </>
        );
    }

    return (
        <div
            className={
                "relative hidden cursor-pointer items-center gap-4 text-base font-semibold text-black lg:flex"
            }
        >
            <div className={"dropdown dropdown-hover"}>
                <Text
                    type={"title-4"}
                    className={classNames(
                        "relative rounded-md px-3 py-2 transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:scale-x-100",
                        {
                            "bg-black font-bold text-white": pathname.includes("/event"),
                            "bg-white text-black after:bg-black": !pathname.includes("/event"),
                        },
                    )}
                >
                    Sự kiện
                </Text>
                <ul
                    tabIndex={0}
                    className={
                        "dropdown-content menu rounded-box z-1000 w-52 bg-white p-2 shadow-sm"
                    }
                >
                    <li>
                        <Link href={"/event/timeline"}>Timeline</Link>
                    </li>
                    <li>
                        <Link href={"/event/schedule"}>Lịch trình</Link>
                    </li>
                    <li>
                        <Link href={"/event/location"}>Địa điểm</Link>
                    </li>
                </ul>
            </div>
            <div className={"h-0.5 w-8 bg-black"} />
            {links.map((link, index) => (
                <Fragment key={link.name}>
                    {index !== 0 && <div className={"h-0.5 w-8 bg-black"} />}
                    <Link
                        href={link.href}
                        className={classNames(
                            "relative rounded-md px-3 py-2 transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:scale-x-100",
                            {
                                "bg-black font-bold text-white": pathname === link.href,
                                "bg-white text-black after:bg-black": pathname !== link.href,
                            },
                        )}
                    >
                        <Text type={"title-4"}>{link.name}</Text>
                    </Link>
                </Fragment>
            ))}
            <div className={"h-0.5 w-8 bg-black"} />
            <div className={"dropdown dropdown-hover"}>
                <Text
                    type={"title-4"}
                    className={classNames(
                        "relative rounded-md px-3 py-2 transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:scale-x-100",
                        {
                            "bg-black font-bold text-white": pathname.includes("/tournament"),
                            "bg-white text-black after:bg-black": !pathname.includes("/tournament"),
                        },
                    )}
                >
                    Tournament
                </Text>
                <ul
                    tabIndex={0}
                    className={
                        "dropdown-content menu rounded-box z-1000 w-52 bg-white p-2 shadow-sm"
                    }
                >
                    <li>
                        <Link href={"/tournament/overview"}>Giới thiệu</Link>
                    </li>
                    <li>
                        <Link href={"/tournament/rules"}>Luật chơi </Link>
                    </li>
                    <li>
                        <Link href={"/tournament/prize"}>Giải thưởng</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
