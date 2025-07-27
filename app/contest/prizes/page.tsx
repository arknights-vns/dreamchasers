"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import PageTitle from "@/components/PageTitle";
import AmiyiRazer from "@/public/tournament/prizes/AmiyiRazer.png";
import Artbook from "@/public/tournament/prizes/Artbook.png";
import Ines from "@/public/tournament/prizes/Ines.png";

export default function PrizePage() {
    const [carouseRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const onSelect = useCallback(() => {
        if (!emblaApi)
            return;
        setCurrentSlide(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi)
            return;

        onSelect();
        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // "ê tao không ngờ Tus muốn leak luôn quà trước offline luôn."
    //     Đụt, 2025
    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle favorText={""} title={"Giải thưởng"} />
                </div>
            </div>
            <div
                className={"mt-4 flex flex-col items-center justify-center"}
            >
                <div className={"relative mx-auto w-full max-w-[720px] px-4"}>
                    {/* Pages indicator */}
                    <div className={"mb-4 flex flex-row gap-1"}>
                        {[0, 1, 2].map((page, index) => {
                            return (
                                <div
                                    key={page}
                                    className={`h-1 w-full cursor-pointer bg-white transition-all duration-300 ${
                                        index === currentSlide ? "opacity-100" : "opacity-50"
                                    }`}
                                    onClick={() => emblaApi?.scrollTo(index)}
                                />
                            );
                        })}
                    </div>
                    <div ref={carouseRef} className={"embla"}>
                        <div className={"embla__container"}>
                            {/* Slide 1 */}
                            <div
                                className={"embla__slide flex h-96 flex-col justify-center space-y-4 px-4"}
                            >
                                <div
                                    className={"text-center text-4xl font-extrabold text-green-400"}
                                >
                                    GIẢI BA
                                </div>
                                <div className={"flex flex-col gap-6 sm:flex-row"}>
                                    <div
                                        className={"flex size-full flex-col justify-between gap-2"}
                                    >
                                        <Image
                                            alt={"Artbook"}
                                            className={"my-auto self-center object-contain"}
                                            src={Artbook}
                                        />
                                        <div
                                            className={"text-center text-lg font-light text-white"}
                                        >
                                            Arknights Artbook VOL 1, 4, 5
                                        </div>
                                    </div>
                                    <div
                                        className={"flex size-full flex-col justify-between gap-2"}
                                    >
                                        <div
                                            className={"flex flex-1 items-center justify-center text-white italic"}
                                        >
                                            [tới Offline là thấy á]
                                        </div>
                                        <div
                                            className={"text-center text-lg font-light text-white"}
                                        >
                                            Giấy khen từ BTC
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Slide 2 */}
                            <div className={"embla__slide flex flex-col justify-center gap-4 px-4"}>
                                <div
                                    className={"text-center text-4xl font-extrabold text-yellow-200"}
                                >
                                    GIẢI NHÌ
                                </div>
                                <div className={"flex flex-col gap-6 sm:flex-row"}>
                                    <div
                                        className={"flex size-full flex-col justify-between gap-2"}
                                    >
                                        <Image
                                            alt={"AmiyiRazer"}
                                            className={"my-auto self-center object-contain"}
                                            src={AmiyiRazer}
                                        />
                                        <div
                                            className={"text-center text-lg font-light text-white"}
                                        >
                                            Razer X Arknights - Chuột không dây - Amiya theme
                                        </div>
                                    </div>
                                    <div
                                        className={"flex size-full flex-col justify-between gap-2"}
                                    >
                                        <div
                                            className={"flex flex-1 items-center justify-center text-white italic"}
                                        >
                                            [tới Offline là thấy á]
                                        </div>
                                        <div
                                            className={"text-center text-lg font-light text-white"}
                                        >
                                            Giấy khen từ BTC
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Slide 3 */}
                            <div className={"embla__slide flex flex-col justify-center gap-4 px-4"}>
                                <div
                                    className={"text-center text-4xl font-extrabold text-orange-300"}
                                >
                                    GIẢI NHẤT
                                </div>
                                <div className={"flex flex-col gap-6 sm:flex-row"}>
                                    <div
                                        className={"flex size-full flex-col justify-between gap-2"}
                                    >
                                        <Image
                                            alt={"Ines"}
                                            className={"my-auto self-center object-contain"}
                                            src={Ines}
                                        />
                                        <div
                                            className={"text-center text-lg font-light text-white"}
                                        >
                                            Figure Ines - 1/7 scale
                                        </div>
                                    </div>
                                    <div
                                        className={"flex size-full flex-col justify-between gap-2"}
                                    >
                                        <div
                                            className={"flex flex-1 items-center justify-center text-white italic"}
                                        >
                                            [tới Offline là thấy á]
                                        </div>
                                        <div
                                            className={"text-center text-lg font-light text-white"}
                                        >
                                            Giấy khen từ BTC
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"absolute top-1/2 -right-[2.5%] hidden md:block lg:-right-24"}
                        onClick={() => emblaApi?.scrollNext()}
                    >
                        <IoIosArrowDropright
                            className={"h-12 w-12 cursor-pointer lg:h-20 lg:w-20"}
                            fill={"#ffffff"}
                        />
                    </div>
                    <div
                        className={"absolute top-1/2 -left-[2.5%] hidden md:block lg:-left-24"}
                        onClick={() => emblaApi?.scrollPrev()}
                    >
                        <IoIosArrowDropleft
                            className={"h-12 w-12 cursor-pointer lg:h-20 lg:w-20"}
                            fill={"#ffffff"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
