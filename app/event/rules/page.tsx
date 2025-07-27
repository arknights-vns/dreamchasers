"use client";

import { Fragment, useEffect, useRef, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                                    description={rule.description}
                                    side={"left"}
                                    title={rule.title}
                                    titleColor={rule.titleColor}
                                />
                            );
                        })}
                </div>

                <div className={"flex flex-1 flex-col items-center justify-start"}>
                    <VerticalLine height={50} />
                    {rules.map((rule, index) => (
                        <Fragment key={rule.description}>
                            <div
                                key={rule.title}
                                className={"flex size-25 items-center justify-center"}
                            >
                                <div className={"relative size-3/4"}>
                                    <rule.icon className={"size-full text-white"} />
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
                                    description={rule.description}
                                    side={"right"}
                                    title={rule.title}
                                    titleColor={rule.titleColor}
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
    const [tab, setTab] = useState<string>("general");
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("rule-tab");
        if (stored && stored !== "") {
            setTab(stored);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("rule-tab", tab);
    }, [tab]);

    function handleTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX;
    };

    function handleTouchMove(e: React.TouchEvent) {
        touchEndX.current = e.touches[0].clientX;
    };

    function handleTouchEnd() {
        if (touchStartX.current === null || touchEndX.current === null)
            return;
        const deltaX = touchEndX.current - touchStartX.current;
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0 && tab === "general") {
                setTab("cosplay");
            } else if (deltaX > 0 && tab === "cosplay") {
                setTab("general");
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <PageTitle
                favorText={"Một số điều cần lưu ý khi tham gia offline"}
                title={"NỘI QUY"}
            />
            <div
                className={"sticky top-[80px] z-0 h-[calc(100vh-80px)] place-content-center-safe"}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onTouchStart={handleTouchStart}
            >
                <Tabs className={"size-full"} value={tab} onValueChange={setTab}>
                    <TabsList className={"h-12 w-full rounded-none border-b bg-neutral-950 p-1"}>
                        <TabsTrigger
                            className={
                                "w-1/2 rounded-none py-3 text-lg font-semibold text-neutral-300 transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:hover:bg-neutral-800/60"
                            }
                            value={"general"}
                        >
                            Nội quy chung
                        </TabsTrigger>
                        <Separator orientation={"vertical"} />
                        <TabsTrigger
                            className={
                                "w-1/2 rounded-none border-r py-3 text-lg font-semibold text-neutral-300 transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:hover:bg-neutral-800/60"
                            }
                            value={"cosplay"}
                        >
                            Dành cho cosplayer
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent className={"mx-4 overflow-y-auto pt-10"} value={"general"}>
                        <RulesList rules={rules} />
                    </TabsContent>

                    <TabsContent className={"mx-4 overflow-y-auto pt-10"} value={"cosplay"}>
                        <RulesList rules={cosplayRules} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
