"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import PageTitle from "@/components/PageTitle";

type Event = {
    date: string;
    title: string;
    href: string;
};

const events: Event[] = [
    {
        date: "14/01/2024",
        title: "Offline #1: The show must go on!",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2035816776811242/",
    },
    {
        date: "31/12/2024",
        title: "Thông báo ra mắt Offline #2: Dreamchasers.",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2299747417084842/",
    },
    {
        date: "12/01/2025",
        title: "Khảo sát 'Dreamchasers' lần 1.",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2308946422831608/",
    },
    {
        date: "04/05/2025",
        title: "Khảo sát 'Dreamchasers' lần 2.",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2409448572781392/",
    },
    {
        date: "06/07/2025",
        title: "Mở bán vé Offline #2: Dreamchasers",
        href: "https://www.facebook.com/share/p/19DVK1nNFb/",
    },
    {
        date: "06/07/2025",
        title: "Công bố design áo Offline",
        href: "https://www.facebook.com/share/p/177CfFuZ5v/",
    },
    {
        date: "07/07/2025",
        title: "Công bố đối tác: Vietnam Community League",
        href: "https://www.facebook.com/share/p/1Zzx29JxMH/",
    },
    {
        date: "08/07/2025",
        title: "Công bố hình ảnh địa điểm offline",
        href: "https://www.facebook.com/share/p/16ZN6cWbuG/",
    },
    {
        date: "11/07/2025",
        title: "Bán hết vé tier Dreamchasers",
        href: "https://www.facebook.com/share/p/18xjxnkdxo/",
    },
    {
        date: "??/??/2025",
        title: "???",
        href: "",
    },
    {
        date: "10/08/2025",
        title: "Offline #2: Dreamchasers",
        href: "",
    },
];
type TimelineProps = {
    events: Event[];
};
function Timeline({ events }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scales, setScales] = useState<Record<number, number>>({});
    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container)
                return;
            const containerRect = container.getBoundingClientRect();
            const newScales: Record<number, number> = {};
            Array.from(container.children).forEach((child, index) => {
                const rect = (child as HTMLElement).getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const containerCenterY = containerRect.top + containerRect.height / 2;

                // How far the item is from the center
                const distance = Math.abs(containerCenterY - centerY);

                // Calculate scale based on distance
                const scale = Math.max(0.2, 1 - distance / 300);

                newScales[index] = scale;
            });
            setScales(newScales);
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => container?.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div
            ref={containerRef}
            className={"relative flex h-[60vh] snap-y snap-mandatory flex-col items-center overflow-y-scroll py-[20vh]"}
        >
            {events.map((ev, index) => {
                return (
                    <div
                        key={ev.title}
                        className={"mx-4 my-5 snap-center p-10 transition-all duration-500 ease-in-out"}
                        style={{
                            transform: `scale(${scales[index] || 0.8})`,
                            opacity: scales[index] ? scales[index] : 0.8,
                        }}
                    >
                        <div
                            className={"flex flex-col items-center justify-center text-center text-white"}
                        >
                            <div className={"pb-2 text-4xl font-extrabold"}>{ev.date}</div>
                            <div className={"text-2xl font-light"}>{ev.title}</div>
                            {ev.href !== "" && (
                                <Link
                                    className={"text-sm font-extralight italic hover:underline"}
                                    href={ev.href}
                                >
                                    (Link bài viết)
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function TimelinePage() {
    return (
        <div className={"h-visible vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle title={"TIMELINE"} favorText={"(bạn có thể scroll để đọc)"} dark />
                </div>
            </div>
            <div className={"flex flex-1/2 items-center justify-center overflow-y-hidden"}>
                <Timeline events={events} />
                {/* Frames */}
                <div
                    className={"absolute top-[calc(45svh)] left-[15vw] hidden sm:left-[20vw] md:left-[25vw] md:block lg:left-[30vw]"}
                >
                    <div className={"h-6 w-6 border-t-2 border-l-2 border-white"} />
                </div>
                <div
                    className={"absolute top-[calc(45svh)] right-[15vw] hidden sm:right-[20vw] md:right-[25vw] md:block lg:right-[30vw]"}
                >
                    <div className={"h-6 w-6 border-t-2 border-r-2 border-white"} />
                </div>
                <div
                    className={"absolute bottom-[calc(20svh)] left-[15vw] hidden sm:left-[20vw] md:left-[25vw] md:block lg:left-[30vw]"}
                >
                    <div className={"h-6 w-6 border-b-2 border-l-2 border-white"} />
                </div>
                <div
                    className={"absolute right-[15vw] bottom-[calc(20svh)] hidden sm:right-[20vw] md:right-[25vw] md:block lg:right-[30vw]"}
                >
                    <div className={"h-6 w-6 border-r-2 border-b-2 border-white"} />
                </div>
                {/* Arrows */}
                <div className={"absolute top-[calc(35svh)] left-1/5"}>
                    <FaArrowUp fill={"#ffffff"} size={28} />
                </div>
                <div className={"absolute top-[calc(35svh)] right-1/5"}>
                    <FaArrowUp fill={"#ffffff"} size={28} />
                </div>
                <div className={"absolute bottom-[calc(15svh)] left-1/5"}>
                    <FaArrowDown fill={"#ffffff"} size={28} />
                </div>
                <div className={"absolute right-1/5 bottom-[calc(15svh)]"}>
                    <FaArrowDown fill={"#ffffff"} size={28} />
                </div>
            </div>
        </div>
    );
}
