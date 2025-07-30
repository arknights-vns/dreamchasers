"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import {
    Timeline,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle
} from "@/components/ui/timeline";

const items = [
    {
        date: "09:15",
        title: "Mở check-in & Khai mạc"
    },
    {
        date: "09:30",
        title: "Mini-games"
    },
    {
        date: "12:20",
        title: "Mini-Tournament"
    },
    {
        date: "13:25",
        title: "Gacha Banner"
    },
    {
        date: "15:00",
        title: "Give-Away & Bế mạc"
    }
];

export default function SchedulePage() {
    const [progression, setProgression] = useState(1);

    useEffect(() => {
        // this is unoptimized af.
        // but it works.
        const now = new Date();
        items.forEach((item, index) => {
            const target = new Date(`2025-08-10T${item.date}:00+07:00`);
            if (now >= target) {
                setProgression(index + 1);
            }
        });
    }, []);

    return (
        <div className={"flex h-visible flex-col bg-vns"}>
            <PageTitle favorText={"Các hoạt động sẽ diễn ra trong offline"} title={"Hoạt động"} />

            <div className={"mx-14 flex flex-col items-center justify-center"}>
                <div className={"text-center italic"}>(*) Kế hoạch & thời gian có thể sẽ thay đổi tùy vào tình hình thực tế.</div>
                <div className={"text-center italic"}>(**) Cái này cập nhật theo thời gian thực.</div>

                <Timeline
                    className={`
                        mx-auto mt-32 hidden
                        md:flex
                    `}
                    orientation={"horizontal"}
                    value={progression}
                >
                    {items.map((item, index) => (
                        <TimelineItem
                            key={item.title}
                            className={`
                                group-data-[orientation=horizontal]/timeline:mt-0
                            `}
                            step={index + 1}
                        >
                            <TimelineHeader>
                                <TimelineSeparator className={`
                                    group-data-[orientation=horizontal]/timeline:top-12
                                `}
                                />
                                <TimelineIndicator className={`
                                    group-data-[orientation=horizontal]/timeline:top-12
                                `}
                                />
                                <TimelineDate className={"mb-8 text-2xl"}>{item.date}</TimelineDate>
                                <TimelineTitle>{item.title}</TimelineTitle>
                            </TimelineHeader>
                        </TimelineItem>
                    ))}
                </Timeline>

                <Timeline
                    className={`
                        mt-8 flex max-h-[30svh]
                        md:hidden
                    `}
                    value={progression}
                >
                    {items.map((item, index) => (
                        <TimelineItem
                            key={item.title}
                            className={`
                                w-[calc(50%-1.5rem)]
                                odd:ms-auto
                                even:text-right
                                even:group-data-[orientation=vertical]/timeline:ms-0
                                even:group-data-[orientation=vertical]/timeline:me-8
                                even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:-right-6
                                even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:left-auto
                                even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:translate-x-1/2
                                even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:-right-6
                                even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:left-auto
                                even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:translate-x-1/2
                            `}
                            step={index + 1}
                        >
                            <TimelineHeader>
                                <TimelineSeparator />
                                <TimelineDate>{item.date}</TimelineDate>
                                <TimelineTitle>{item.title}</TimelineTitle>
                                <TimelineIndicator />
                            </TimelineHeader>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>

        </div>
    );
}
