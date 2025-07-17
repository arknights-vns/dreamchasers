"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import PurchaseTicketButton from "@/components/PurchaseTicketButton";
import PrismaDolphin from "@/public/tickets/prisma_dolphin.jpg";
import PrismaDRCH from "@/public/tickets/prisma_drch.jpg";
import PrismaWhale from "@/public/tickets/prisma_whale.jpg";
import ShirtPreview from "@/public/tickets/shirt_preview.png";

type TicketCardProps = {
    tier: string;
    price: string;
    image: StaticImageData;
    parentTier?: string;
    description: string[];
};

function TicketCard(props: TicketCardProps) {
    const [isImageOverlayOpen, setImageOverlayOpen] = useState(false);

    return (
        <>
            <div
                className={"m-4 flex min-h-110 min-w-84 flex-col items-center justify-between rounded-3xl border-4 border-white/80 bg-black/70 lg:w-1/3"}
            >
                <div className={"relative mt-4 w-full px-4"}>
                    <Image
                        src={props.image}
                        alt={"BG"}
                        className={"h-[64px] w-full rounded-xl object-cover"}
                    />
                    <div
                        className={"absolute top-0 left-0 flex h-[64px] w-full items-center justify-center text-center text-2xl font-bold md:text-3xl lg:text-4xl"}
                        style={{ textShadow: "0 2px 8px #fff, 0 1px 0 #ffe066" }}
                    >
                        {props.tier.toUpperCase()}
                        {" "}
                        TIER
                    </div>
                </div>
                <div className={"flex flex-col text-center text-white"}>
                    {props.parentTier && (
                        <div className={"my-2 text-lg font-light"}>
                            Bao gồm quà từ
                            {" "}
                            {props.parentTier}
                            , cộng thêm:
                        </div>
                    )}
                    {props.description.map(line => (
                        <div
                            key={line}
                            className={"my-2 text-lg font-bold"}
                            style={{ textShadow: "0 1px 2px #000" }}
                        >
                            ✓
                            {" "}
                            {line}
                        </div>
                    ))}
                    {props.tier === "Dreamchasers" && (
                        <Image
                            src={ShirtPreview}
                            alt={"Áo thun Dreamchasers"}
                            height={120}
                            className={"my-2 self-center rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"}
                            onClick={() => setImageOverlayOpen(true)}
                        />
                    )}
                </div>
                <div className={"mb-4 text-center text-white"}>
                    <div className={"mb-0 text-4xl font-extrabold"}>{props.price}</div>
                    <div className={"text-lg font-bold tracking-widest"}>VNĐ</div>
                </div>
            </div>

            {/* Image Overlay */}
            {isImageOverlayOpen && (
                <div
                    className={"fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"}
                    onClick={() => setImageOverlayOpen(false)}
                >
                    <Image
                        src={ShirtPreview}
                        alt={"Áo thun Dreamchasers - Full Size"}
                        className={"max-w-[95vw] max-h-[65vh] object-contain"}
                    />
                </div>
            )}
        </>
    );
}

export default function TicketOverviewPage() {
    return (
        <div className={"h-visible vns-background"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle title={"Mua vé"} favorText={""} dark />
                </div>
            </div>
            <div className={"flex flex-col items-center justify-center pb-10 lg:pb-0"}>
                <div className={"flex w-full flex-col items-center justify-center lg:flex-row"}>
                    <TicketCard
                        tier={"Dolphin"}
                        image={PrismaDolphin}
                        price={"119.000"}
                        description={[
                            "Keychain Amiya - Chasing The Dream",
                            "Sticker (ngẫu nhiên 1 trong 4)",
                            "Badge nắp chai by Rei Não Cá",
                            "Card bo góc by Rei Não Cá",
                        ]}
                    />
                    <TicketCard
                        tier={"Whale"}
                        parentTier={"Dolphin"}
                        image={PrismaWhale}
                        price={"199.000"}
                        description={["Badge Amiya - Chasing The Dream", "Lanyard - Dreamchasers"]}
                    />
                    <TicketCard
                        tier={"Dreamchasers"}
                        parentTier={"Whale"}
                        image={PrismaDRCH}
                        price={"269.000"}
                        description={[
                            "Áo thun Dreamchasers (hình dưới)",
                            "Badge Logos/Eyja của bibom10",
                        ]}
                    />
                </div>
                <PurchaseTicketButton />
            </div>
        </div>
    );
}
