"use client";

import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import { useTimer } from "@/lib/hooks/useTimer";

const amiyi = "https://raw.githubusercontent.com/ArknightsAssets/ArknightsAssets2/refs/heads/cn/assets/dyn/arts/charportraits/char_002_amiya_1.png";

type OperatorProps = {
    name: string;
    imgSrc: string;
    class: "sniper" | "caster" | "defender" | "guard" | "medic" | "specialist" | "supporter" | "vanguard";
};

function BannedOperator({ name, imgSrc, class: opClass }: OperatorProps) {
    return (
        <div
            className={"relative aspect-[1/2] flex-1 flex flex-col justify-start"}
            style={{ background: "linear-gradient(to bottom, rgba(204, 204, 204,0.2) 0%, rgba(204, 204, 204,0) 10%)" }}
        >
            <Image src={imgSrc} fill alt={name} draggable={false} />
            <div className={"absolute w-full flex flex-row bottom-[10%]"}>
                <div className={"flex flex-col items-start"}>
                    <div className={"relative w-10 h-10 min-w-10 min-h-10 bg-white p-0.5 mx-2"}>
                        <Image
                            src={`/operator/classes/${opClass}.png`}
                            width={36}
                            height={36}
                            alt={opClass}
                            className={"invert"}
                            draggable={false}
                        />
                    </div>
                </div>
                <div className={"flex-1 min-w-0"}>
                    <h1
                        className={"text-xl text-white font-bold break-words"}
                        style={{
                            textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }}
                    >
                        {name}
                    </h1>
                </div>
            </div>
        </div>
    );
}

function EmptySlot() {
    return (
        <div
            className={"relative aspect-[1/2] flex-1 flex flex-col justify-start"}
            style={{ background: "radial-gradient(circle, rgba(204,204,204,0) 60%, rgba(204,204,204,0.2) 100%)" }}
        >
        </div>
    );
}

export default function TournamentSlidePage() {
    const { isTimerLoaded, timerData, getDisplayTime, formatTime, isRealtimeConnected } = useTimer();

    return (
        <div className={"h-[calc(100vh)] vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle
                        title={"Banned Operators"}
                        dark
                    />
                </div>
            </div>
            <div
                className={"flex flex-1/2 flex-col justify-center items-center w-full pt-10 px-[10%]"}
                data-theme={"dark"}
            >
                <div className={"grid grid-cols-6 gap-20 w-full"}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <BannedOperator
                            key={i}
                            name={"Amiya"}
                            imgSrc={amiyi}
                            class={"caster"}
                        />
                    ))}
                    <EmptySlot />
                </div>
                <div className={"flex self-center mt-15"}>
                    <div className={"text-xl text-white"}>
                        Thời gian còn lại:
                        {" "}
                        <span className={`font-extrabold ${
                            !isTimerLoaded
                                ? "text-red-400"
                                : timerData.state === "running"
                                    ? "text-green-400"
                                    : timerData.state === "paused"
                                        ? "text-yellow-400"
                                        : "text-red-400"
                        }`}
                        >
                            {!isTimerLoaded ? "--:--" : formatTime(getDisplayTime())}
                        </span>
                    </div>
                </div>
                <div className={"text-base-content font-extrabold"}>
                    Terra #1:
                    {" "}
                    <span className={`${isRealtimeConnected ? "text-green-300" : "text-red-300"}`}>
                        {isRealtimeConnected ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    );
}
