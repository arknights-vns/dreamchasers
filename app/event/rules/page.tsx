"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FaGun, FaPersonMilitaryRifle } from "react-icons/fa6";
import { GiSwordsPower } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import {
    LiaBalanceScaleSolid,
    LiaBroomSolid,
    LiaChildSolid,
    LiaCommentDotsSolid,
    LiaDogSolid,
    LiaHammerSolid,
    LiaStoreAltSolid,
    LiaSyringeSolid,
    LiaTshirtSolid,
    LiaUserFriendsSolid,
} from "react-icons/lia";
import { MdDoNotTouch } from "react-icons/md";
import PageTitle from "@/components/PageTitle";

type IconType = React.ComponentType<{ className?: string }>;

type RuleType = {
    title: string;
    titleColor: "red" | "green" | "yellow";
    description: string;
    icon: IconType;
};

function VerticalLine({ height }: { height: number }) {
    return <div className={"w-0 border-2 border-white"} style={{ height: `${height}px` }}></div>;
}

function RuleSection({
    title,
    titleColor,
    description,
    side,
}: {
    title: string;
    titleColor: "red" | "green" | "yellow";
    description: string;
    side: "left" | "right";
}) {
    const colorClass
        = {
            red: "text-[#FF4B4E]",
            green: "text-[#75FF4B]",
            yellow: "text-[#FFE44B]",
        }[titleColor] || "text-default";
    return (
        <div
            className={`grid h-50 w-full content-center md:max-w-100 ${side === "left" ? "justify-items-end" : "justify-items-start"}`}
        >
            <div
                className={`flex flex-col gap-1 ${side === "left" ? "items-end text-right" : "items-start text-left"}`}
            >
                <h1 className={`${colorClass} text-2xl font-medium md:text-5xl`}>{title}</h1>
                <p
                    className={`${side === "left" ? "text-right" : "text-left"} text-lg font-medium text-white md:text-xl`}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

function RulesList({ rules }: { rules: RuleType[] }) {
    return (
        <div className={"flex w-full flex-col items-center justify-center"}>
            <div
                className={"mb-20 grid w-full md:mb-50 md:gap-5"}
                style={{ gridTemplateColumns: "1fr 100px 1fr" }}
            >
                <div className={"flex flex-col items-end justify-start gap-50"}>
                    {rules
                        .filter((_, index) => index % 2 === 0)
                        .map((rule) => {
                            return (
                                <RuleSection
                                    key={rule.description}
                                    title={rule.title}
                                    titleColor={rule.titleColor}
                                    description={rule.description}
                                    side={"left"}
                                />
                            );
                        })}
                </div>

                <div className={"flex flex-1 flex-col items-center justify-start"}>
                    <VerticalLine height={50} />
                    {rules.map((rule, index) => (
                        <Fragment key={rule.description}>
                            <div
                                className={"flex h-25 w-25 items-center justify-center"}
                                key={rule.title}
                            >
                                <div className={"relative h-3/4 w-3/4"}>
                                    <rule.icon className={"h-full w-full text-white"} />
                                </div>
                            </div>
                            {index !== rules.length - 1 ? <VerticalLine height={100} /> : <></>}
                        </Fragment>
                    ))}
                </div>

                <div className={"mt-50 flex flex-col items-start justify-start gap-50"}>
                    {rules
                        .filter((_, index) => index % 2 === 1)
                        .map((rule) => {
                            return (
                                <RuleSection
                                    key={rule.description}
                                    title={rule.title}
                                    titleColor={rule.titleColor}
                                    description={rule.description}
                                    side={"right"}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

const rules: RuleType[] = [
    {
        title: "CẤM",
        titleColor: "red",
        description:
            "Tất cả các hình thức quấy rối, xâm phạm đến tài sản và quyền riêng tư cá nhân.",
        icon: MdDoNotTouch,
    },
    {
        title: "CẤM",
        titleColor: "red",
        description:
            "Mang vũ khí quân sự (s.ú.n.g, d.a.o,...) và các vật dụng nguy hiểm vào trong khu vực sự kiện.",
        icon: GiSwordsPower,
    },
    {
        title: "CẤM",
        titleColor: "red",
        description: "Tất cả các loại chất kích thích, cấm các hành vi gây mất trật tự công cộng.",
        icon: LiaSyringeSolid,
    },
    {
        title: "CẤM",
        titleColor: "red",
        description: "Bàn về chính trị, phân biệt vùng miền, gây mâu thuẫn, và bạo lực.",
        icon: LiaBalanceScaleSolid,
    },
    {
        title: "CẤM",
        titleColor: "red",
        description:
            "Cấm các trang phục phản cảm, trang phục thuộc quân phục, cảnh phục... không phù hợp với thuần phong mỹ tục hay tính chất của sự kiện.",
        icon: LiaTshirtSolid,
    },
    {
        title: "CẤM",
        titleColor: "red",
        description: "Cấm mang vật nuôi, thú vật vào sự kiện.",
        icon: LiaDogSolid,
    },
    {
        title: "CẤM",
        titleColor: "red",
        description:
            "Những hành vi gây tổn hại đến cơ sở vật chất của khuôn viên sự kiện sẽ phải chịu trách nhiệm và đền bù.",
        icon: LiaHammerSolid,
    },
    {
        title: "BẮT BUỘC",
        titleColor: "red",
        description: "Trẻ em dưới 13 tuổi cần có sự giám sát và quản lý của người lớn.",
        icon: LiaChildSolid,
    },
    {
        title: "HÃY",
        titleColor: "green",
        description: "Giữ gìn vệ sinh chung khuôn viên sự kiện",
        icon: LiaBroomSolid,
    },
    {
        title: "VUI LÒNG",
        titleColor: "green",
        description: "Tự quản tư trang cá nhân. Mọi mất mát BTC sẽ không chịu trách nhiệm. ",
        icon: IoBag,
    },
    {
        title: "NẾU",
        titleColor: "green",
        description: "Nhặt được đồ thất lạc vui lòng liên hệ BTC để nhận hỗ trợ.",
        icon: LiaCommentDotsSolid,
    },
    {
        title: "KHI",
        titleColor: "green",
        description:
            "Xảy ra sự cố, xung đột hay tranh chấp... tại offline, quyết định của BTC là quyết định tiên quyết.",
        icon: LiaUserFriendsSolid,
    },
    {
        title: "BTC",
        titleColor: "yellow",
        description:
            "Miễn trách nhiệm đối với các giao dịch cá nhân, ngoại trừ tại khu vực booth của nhà tài trợ.",
        icon: LiaStoreAltSolid,
    },
    {
        title: "BTC",
        titleColor: "red",
        description:
            "Không chịu trách nhiệm với những vấn đề giữa các khách hàng với nhau.",
        icon: MdDoNotTouch,
    },
];

const cosplayRules: RuleType[] = [
    {
        title: "HÃY",
        titleColor: "green",
        description:
            "Mặc sẵn đồ cosplay và trang điểm trước. Vì bên trong quán chúng mình không có chỗ để sửa soạn",
        icon: LiaTshirtSolid,
    },
    {
        title: "NGHIÊM CẤM",
        titleColor: "red",
        description:
            "Hóa trang nhân vật có trang phục thuộc quân phục, cảnh phục, hoặc không phù hợp thuần phong mỹ tục.",
        icon: FaGun,
    },
    {
        title: "LƯU Ý",
        titleColor: "yellow",
        description: "Props & Weaps, mô hình vũ khí nhân vật các bạn được phép mang theo. Tuy nhiên vũ khí thật vẫn bị cấm.",
        icon: FaPersonMilitaryRifle,
    },
];

export default function RulePage() {
    const [ruleTab, setRuleTab] = useState<string>("general");

    useEffect(() => {
        const stored = localStorage.getItem("rule-tab");
        if (stored && stored !== "") {
            setRuleTab(stored);
        }
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        startIndex: 0,
    });

    useEffect(() => {
        localStorage.setItem("rule-tab", ruleTab);

        if (emblaApi) {
            const targetIndex = ruleTab === "general" ? 0 : 1;
            emblaApi.scrollTo(targetIndex);
        }
    }, [ruleTab, emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi)
            return;
        const selectedIndex = emblaApi.selectedScrollSnap();
        setRuleTab(selectedIndex === 0 ? "general" : "cosplay");
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi)
            return;
        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi)
                emblaApi.scrollTo(index);
        },
        [emblaApi],
    );

    return (
        <div className={"h-visible vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle
                        title={"NỘI QUY"}
                        favorText={"Một số điều cần lưu ý khi tham gia offline"}
                        dark
                    />
                </div>
            </div>
            {/* Desktop tabs - original design */}
            <div
                className={"tabs tabs-border sticky top-[70px] z-0 hidden h-[calc(100vh-70px)] place-content-center-safe overflow-hidden rounded-none md:flex"}
                data-theme={"dark"}
            >
                <input
                    type={"radio"}
                    name={"my_tabs_6"}
                    className={"tab sm:text-md text-base-content w-1/2 md:text-lg lg:text-2xl"}
                    aria-label={"Nội quy chung"}
                    checked={ruleTab === "general"}
                    onChange={() => setRuleTab("general")}
                />
                <div className={"tab-content overflow-y-auto border-t-gray-400 py-10"}>
                    <div className={"h-full flex-1 px-5"}>
                        <RulesList rules={rules} />
                    </div>
                </div>
                <input
                    type={"radio"}
                    name={"my_tabs_6"}
                    className={"tab sm:text-md text-base-content w-1/2 md:text-lg lg:text-2xl"}
                    aria-label={"Dành cho cosplayer"}
                    checked={ruleTab === "cosplay"}
                    onChange={() => setRuleTab("cosplay")}
                />
                <div className={"tab-content overflow-y-auto border-t-gray-400 py-10"}>
                    <div className={"h-full flex-1 px-5"}>
                        <RulesList rules={cosplayRules} />
                    </div>
                </div>
            </div>

            {/* Mobile swipable tabs */}
            <div
                className={"swipe-tabs sticky top-[70px] z-0 h-[calc(100vh-70px)] md:hidden"}
                data-theme={"dark"}
            >
                {/* Tab indicators */}
                <div className={"flex w-full border-b border-gray-400"}>
                    <button
                        type={"button"}
                        className={`text-base-content flex-1 py-3 text-center transition-colors ${
                            ruleTab === "general"
                                ? "border-b-2 border-white text-white"
                                : "text-gray-400"
                        }`}
                        onClick={() => scrollTo(0)}
                    >
                        Nội quy chung
                    </button>
                    <button
                        type={"button"}
                        className={`text-base-content flex-1 py-3 text-center transition-colors ${
                            ruleTab === "cosplay"
                                ? "border-b-2 border-white text-white"
                                : "text-gray-400"
                        }`}
                        onClick={() => scrollTo(1)}
                    >
                        Dành cho cosplayer
                    </button>
                </div>

                {/* Swipable content */}
                <div className={"embla h-[calc(100%-48px)] overflow-hidden"} ref={emblaRef}>
                    <div className={"embla__container flex h-full"}>
                        <div className={"embla__slide flex-[0_0_100%] overflow-y-auto py-10"}>
                            <div className={"h-full flex-1 px-5"}>
                                <RulesList rules={rules} />
                            </div>
                        </div>
                        <div className={"embla__slide flex-[0_0_100%] overflow-y-auto py-10"}>
                            <div className={"h-full flex-1 px-5"}>
                                <RulesList rules={cosplayRules} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
