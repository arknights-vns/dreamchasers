"use client";

// import Autoplay from "embla-carousel-autoplay";
// import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrganizerImage from "@/components/OrganizerImage";
import DRCH_Banner from "@/public/DRCH_Banner_Group.png";
import Jiangles_Banner from "@/public/organizers/jiangles_banner.png";
import ModSquad_Banner from "@/public/organizers/mod_squad_banner.png";
import VNS_Banner from "@/public/organizers/vns_banner.png";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export default function Home() {
    // const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: -1, hours: -1, minutes: -1, seconds: -1 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const targetDate = new Date("2025-08-10T09:15:00+07:00");
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"flex h-visible bg-vns"}>
            {/* The real shit. */}
            <div className={`
                flex flex-1/2 flex-col items-center justify-center space-y-4
            `}
            >
                <Image
                    alt={"DRCH"}
                    className={`
                        invert
                        dark:invert-0
                    `}
                    height={185}
                    src={DRCH_Banner}
                    width={727}
                />
                <div className={`
                    flex w-full max-w-lg items-center justify-center px-8
                `}
                >
                    <div className={"text-4xl font-bold"}>
                        {
                            [
                                { value: timeLeft.days, label: "Ngày" },
                                { value: timeLeft.hours, label: "Giờ" },
                                { value: timeLeft.minutes, label: "Phút" },
                                { value: timeLeft.seconds, label: "Giây" }
                            ].map(item => (
                                item.value !== -1 ? item.value.toString().padStart(2, "0") : "--"
                            )).join(":")
                        }
                    </div>
                </div>
                <div className={`
                    absolute bottom-5 flex flex-col gap-y-2 text-center
                `}
                >
                    Được mang đến cho bạn bởi
                    <div className={`
                        flex w-[70vw] items-center justify-between text-primary
                        md:w-[50vw]
                    `}
                    >
                        <OrganizerImage alt={"VNS"} src={VNS_Banner} />
                        <div className={`text-xl`}>
                            •
                        </div>
                        <OrganizerImage alt={"Mod_Squad"} src={ModSquad_Banner} />
                        <div className={`text-xl`}>
                            •
                        </div>
                        <OrganizerImage alt={"Jiangles"} src={Jiangles_Banner} />
                    </div>
                </div>
            </div>
        </div>
    );
}
