"use client";

import type {
    CarouselApi
} from "@/components/ui/carousel";
import { clsx } from "clsx";
import { Ban, Clock, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

export default function RulePage() {
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className={"flex h-visible flex-col bg-vns"}>
            <PageTitle title={"Thể thức & Luật lệ"} />

            <div className={`
                mx-4 flex flex-1/2 flex-col items-center justify-center
            `}
            >
                {/* Page indicator */}
                <div className={`
                    mx-4 flex w-sm space-x-1 self-center
                    md:w-xl
                    lg:w-2xl
                `}
                >
                    {[...Array.from({ length: count })].map((_, idx) => (
                        <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            className={clsx(
                                "h-1 w-full min-w-0 cursor-pointer bg-white",
                                "transition-all duration-300",
                                idx === current - 1
                                    ? "opacity-100"
                                    : `opacity-50`
                            )}
                            onClick={() => api!.scrollTo(idx)}
                        />
                    ))}
                </div>

                <div className={`
                    max-w-[400px]
                    md:max-w-2xl
                    lg:max-w-4xl
                `}
                >
                    <Carousel className={"h-auto w-full"} setApi={setApi}>
                        <CarouselContent className={"text-white"}>
                            {/* 1. Stage */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 items-center justify-center
                                    `}
                                    >
                                        <Image
                                            alt={"map-info"}
                                            className={"object-contain"}
                                            height={300}
                                            src={"/tournament/regulations/tournament-rule-1.jpg"}
                                            width={500}
                                        />
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            1. Map
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            Màn chơi được chọn cho Mini-Tournament là
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                H14-4
                                            </span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                            {/* 2. Team */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 items-center justify-center
                                    `}
                                    >
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                flex items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={"object-contain"}
                                                    height={100}
                                                    src={"/tournament/regulations/tournament-rule-2-select.png"}
                                                    width={100}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                (tối đa 7)
                                            </CardFooter>
                                        </Card>
                                        <Plus color={"#ffffff"} size={48} />
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                flex items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={"object-contain"}
                                                    height={100}
                                                    src={"/tournament/regulations/tournament-rule-2-amiya.jpg"}
                                                    width={100}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                (bắt buộc)
                                            </CardFooter>
                                        </Card>
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            2. Squad
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            Bạn được phép mang tối đa
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                08 Operator
                                            </span>
                                            {", "}
                                            bao gồm:
                                            {" "}
                                            <span className={`
                                                font-extrabold text-green-300
                                            `}
                                            >
                                                07 Operator tự chọn
                                            </span>
                                            {" "}
                                            và
                                            {" "}
                                            <span className={`
                                                font-extrabold text-red-300
                                            `}
                                            >
                                                01 operator bắt buộc
                                            </span>
                                            {" "}
                                            là
                                            {" "}
                                            <span className={`
                                                font-extrabold italic underline
                                            `}
                                            >
                                                Amiya (Medic)
                                            </span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                            {/* 3. In-game */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 items-center justify-center
                                        p-0!
                                    `}
                                    >
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                flex items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={`
                                                        h-full object-contain
                                                    `}
                                                    height={200}
                                                    src={"/tournament/regulations/tournament-rule-3-1.jpg"}
                                                    width={200}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                Leak
                                            </CardFooter>
                                        </Card>
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                flex items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={`
                                                        h-full object-contain
                                                    `}
                                                    height={200}
                                                    src={"/tournament/regulations/tournament-rule-3-2.jpg"}
                                                    width={200}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                Tạm dừng Game
                                            </CardFooter>
                                        </Card>
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                flex items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={`
                                                        h-full object-contain
                                                    `}
                                                    height={200}
                                                    src={"/tournament/regulations/tournament-rule-3-3.jpg"}
                                                    width={200}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                Chỉnh tốc dộ
                                            </CardFooter>
                                        </Card>
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            3. In-Game
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            Bạn được phép
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                Leak
                                            </span>
                                            {", "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                Tạm dừng Game
                                            </span>
                                            {" "}
                                            và
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                Điều chỉnh Tốc độ
                                            </span>
                                            {" "}
                                            trong quá trình tham gia.
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                            {/* 4. Time Limit */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 flex-col items-center
                                        justify-evenly
                                    `}
                                    >
                                        <Clock color={"#ffffff"} size={128} />
                                        <div className={`
                                            text-center text-lg font-extralight
                                            text-white italic
                                        `}
                                        >
                                            (Staff sẽ báo hiệu khi bạn còn
                                            {" "}
                                            <span className={`
                                                font-extrabold text-green-300
                                            `}
                                            >
                                                50% thời gian
                                            </span>
                                            {" "}
                                            và
                                            {" "}
                                            <span className={`
                                                font-extrabold text-red-300
                                            `}
                                            >
                                                01 phút
                                            </span>
                                            {" "}
                                            để hoàn thành)
                                        </div>
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            4. Giới hạn thời gian
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            Bạn sẽ có
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                06 phút
                                            </span>
                                            {" "}
                                            để hoàn thành màn chạy, bao gồm
                                            {" "}
                                            <span className={`
                                                font-extrabold text-cyan-300
                                            `}
                                            >
                                                02 phút
                                            </span>
                                            {" "}
                                            chọn operator.
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                            {/* 5. Game Limit */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 items-center justify-center
                                    `}
                                    >
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                flex items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={"object-contain"}
                                                    height={100}
                                                    src={"/tournament/regulations/tournament-rule-5-1.png"}
                                                    width={100}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                (tối đa 4 roadblock)
                                            </CardFooter>
                                        </Card>
                                        <Card className={`
                                            items-center border-none
                                            bg-transparent
                                        `}
                                        >
                                            <CardContent className={`
                                                items-center justify-center
                                            `}
                                            >
                                                <Image
                                                    alt={"map-info"}
                                                    className={"object-contain"}
                                                    height={100}
                                                    src={"/tournament/regulations/tournament-rule-5-2.png"}
                                                    width={100}
                                                />
                                                <Ban
                                                    className={`
                                                        absolute translate-x-4
                                                        -translate-y-20
                                                    `}
                                                    color={"#ff0000"}
                                                    size={64}
                                                />
                                            </CardContent>
                                            <CardFooter className={`
                                                text-center font-bold text-white
                                            `}
                                            >
                                                (Specialist ban)
                                            </CardFooter>
                                        </Card>
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            5. Giới hạn màn chơi #1
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            Bạn chỉ được dùng tối đa
                                            {" "}
                                            <span className={`
                                                font-extrabold text-red-300
                                            `}
                                            >
                                                04 Roadblock
                                            </span>
                                            {" "}
                                            và
                                            {" "}
                                            <span className={`
                                                font-extrabold text-red-300
                                            `}
                                            >
                                                không được dùng Specialist
                                            </span>
                                            .
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                            {/* 6. Game Limit */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 flex-wrap items-center
                                        justify-center p-0!
                                    `}
                                    >
                                        {
                                            [
                                                { num: 1, name: "Wis'adel" },
                                                { num: 2, name: "Ifrit" },
                                                { num: 3, name: "Kal'tsit" },
                                                { num: 4, name: "Virtuosa" },
                                                { num: 5, name: "Ling" }
                                            ].map(v => (
                                                <Card
                                                    key={v.num}
                                                    className={`
                                                        items-center border-none
                                                        bg-transparent
                                                    `}
                                                >
                                                    <CardContent className={`
                                                        flex items-center
                                                        justify-center
                                                    `}
                                                    >
                                                        <Image
                                                            alt={"map-info"}
                                                            className={`
                                                                object-cover
                                                            `}
                                                            height={69}
                                                            src={`/tournament/regulations/tournament-rule-6-${v.num}.png`}
                                                            width={69}
                                                        />
                                                    </CardContent>
                                                    <CardFooter className={`
                                                        text-center font-bold
                                                        text-white
                                                    `}
                                                    >
                                                        {v.name}
                                                    </CardFooter>
                                                </Card>
                                            ))
                                        }
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            6. Giới hạn màn chơi #2
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            <span className={`
                                                font-extrabold text-red-300
                                            `}
                                            >
                                                05 Operator trên sẽ bị BAN
                                            </span>
                                            {" "}
                                            và
                                            {" "}
                                            <span className={`
                                                font-extrabold text-green-300
                                            `}
                                            >
                                                06 Operator khác do các bạn chọn
                                            </span>
                                            {", "}
                                            nâng tổng số Operator bị ban lên con số
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                11 Operator
                                            </span>
                                            .
                                        </div>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                            {/* 7. Scoring */}
                            <CarouselItem className={"h-128"}>
                                <Card className={"border-none bg-transparent"}>
                                    <CardContent className={`
                                        flex h-72 flex-col items-center
                                        justify-center space-y-5
                                    `}
                                    >
                                        <ul className={`
                                            list-disc space-y-2 pl-4 text-lg
                                            text-white
                                        `}
                                        >
                                            <li>Thời gian bạn chọn operator.</li>
                                            <li>Thời gian 1 màn chạy.</li>
                                            <li>Số địch đánh được - không bao gồm leak.</li>
                                            <li>Bạn đánh Theresa tới đâu - cả phase 1 lẫn phase 2.</li>
                                            <li>Squad bạn sử dụng - rarity, số lượng.</li>
                                        </ul>
                                        <span className={`
                                            text-center text-xl font-extrabold
                                            text-red-300
                                        `}
                                        >
                                            *Trong mọi trường hợp, BTC sẽ là bên đưa ra quyết định cuối cùng.
                                        </span>
                                    </CardContent>
                                    <CardFooter className={`
                                        flex flex-col space-y-2 text-white
                                    `}
                                    >
                                        <div className={`
                                            text-center text-4xl font-extrabold
                                        `}
                                        >
                                            7. Quy chế tính điểm
                                        </div>
                                        <div className={"text-center text-xl"}>
                                            BTC sẽ sử dụng quy tắc tính điểm
                                            {" "}
                                            <span className={`
                                                font-extrabold text-amber-300
                                            `}
                                            >
                                                Score Attack
                                            </span>
                                            {" "}
                                            dựa trên các yếu tố được định trước.
                                        </div>
                                        <Button asChild>
                                            <Link
                                                className={`
                                                    border
                                                    hover:invert
                                                `}
                                                href={"/contest/scoring"}
                                            >
                                                Bạn có thể xem cụ thể tại đây.
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className={`
                            hidden cursor-pointer
                            md:flex
                        `}
                        />
                        <CarouselNext className={`
                            hidden cursor-pointer
                            md:flex
                        `}
                        />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
