"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import PageTitle from "@/components/PageTitle";
import ProgressBar from "@/components/svg/ProgressBar";
import Target from "@/components/svg/Target";

export default function RulePage() {
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

    return (
        <div className={"h-visible vns-background flex flex-col"}>
            <PageTitle title={"Luật chơi"} />

            <div
                className={"mt-4 flex flex-col items-center justify-center"}
                data-theme={"dark"}
            >
                <div className={"relative mx-auto w-full max-w-[720px] px-4"}>
                    {/* Pages indicator */}
                    <div className={"mb-4 flex flex-row gap-1"}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((page, index) => {
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
                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <Image
                                    alt={"Rule 1"}
                                    className={"w-full max-w-[480px] object-cover"}
                                    height={1000}
                                    src={"/tournament/regulations/tournament-rule-1.jpg"}
                                    width={1600}
                                />
                                <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                    1. Map
                                </h5>
                                <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                    Màn chơi sẽ được chọn là
                                    {" "}
                                    <span style={{ color: "#FFEF3C" }}>H14-4</span>
                                </p>
                            </div>
                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div className={"flex max-w-[420px] flex-row flex-wrap"}>
                                    <Image
                                        alt={"Amiya Medic"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/amiya-char.jpg"}
                                        width={320}
                                    />
                                    <Image
                                        alt={"Operator Slot"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <Image
                                        alt={"Operator Slot"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <Image
                                        alt={"Operator Slot"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            alt={"Operator Slot"}
                                            className={"size-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            width={320}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            alt={"Operator Slot"}
                                            className={"size-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            width={320}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                    <Image
                                        alt={"Operator Slot"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <Image
                                        alt={"Operator Slot"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <Image
                                        alt={"Rule 2"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <Image
                                        alt={"Operator Slot"}
                                        className={"w-[16.666%] object-cover"}
                                        height={640}
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        width={320}
                                    />
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            alt={"Operator Slot"}
                                            className={"size-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            width={320}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            alt={"Operator Slot"}
                                            className={"size-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            width={320}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                </div>
                                <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                    2. Team build
                                </h5>
                                <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                    Squad của bạn tổng cộng chỉ có
                                    {" "}
                                    <span style={{ color: "#FFEF3C" }}>8 Operators</span>
                                    ,
                                    <br />
                                    bao gồm 7 Operators tự chọn. Bắt buộc phải có
                                    {" "}
                                    <span style={{ fontWeight: "bold" }}>Amiya Medic</span>
                                </p>
                            </div>
                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div
                                    className={"flex flex-col items-center gap-6 sm:flex-row sm:justify-between"}
                                >
                                    <div
                                        className={"flex h-full w-full max-w-[120px] flex-col justify-between gap-2 sm:w-1/3"}
                                    >
                                        <Image
                                            alt={"Leak địch"}
                                            className={"my-auto w-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-3-1.jpg"}
                                            width={320}
                                        />
                                        <p className={"text-base leading-[125%] font-bold text-white lg:text-xl"}>
                                            Leak địch
                                        </p>
                                    </div>
                                    <div
                                        className={"flex h-full w-full max-w-[120px] flex-col justify-between gap-2 sm:w-1/3"}
                                    >
                                        <Image
                                            alt={"Pause / Pause trick"}
                                            className={"my-auto w-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-3-2.jpg"}
                                            width={320}
                                        />
                                        <p className={"text-base leading-[125%] font-bold text-white lg:text-xl"}>
                                            Pause / Pause trick
                                        </p>
                                    </div>
                                    <div
                                        className={"flex h-full w-full max-w-[120px] flex-col justify-between gap-2 sm:w-1/3"}
                                    >
                                        <Image
                                            alt={"Điều chỉnh tốc độ"}
                                            className={"my-auto w-full object-contain"}
                                            height={640}
                                            src={"/tournament/regulations/tournament-rule-3-3.jpg"}
                                            width={320}
                                        />
                                        <p className={"text-base leading-[125%] font-bold text-white lg:text-xl"}>
                                            Điều chỉnh tốc độ
                                        </p>
                                    </div>
                                </div>
                                <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                    3. Gameplay - Rules
                                </h5>
                                <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                    Bạn có thể
                                    {" "}
                                    <span style={{ color: "#FFEF3C", fontWeight: "bold" }}>
                                        Leak địch
                                    </span>
                                    ,
                                    {" "}
                                    <span style={{ color: "#FFEF3C", fontWeight: "bold" }}>
                                        tạm dừng game
                                    </span>
                                    {" "}
                                    và
                                    {" "}
                                    <span style={{ color: "#FFEF3C", fontWeight: "bold" }}>
                                        điều chỉnh tốc độ
                                    </span>
                                </p>
                            </div>
                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div className={"flex items-center gap-3"}>
                                    <FaRegClock className={"mr-8 size-20"} fill={"#ffffff"} />
                                    <div>
                                        <h5 className={"text-xl leading-[150%] font-medium text-white lg:text-2xl"}>
                                            <span style={{ color: "#6CFF5E" }}>6 phút</span>
                                            {" "}
                                            Gameplay
                                        </h5>
                                        <h5 className={"mt-2 text-xl leading-[150%] font-medium text-white lg:text-2xl"}>
                                            [
                                            <span style={{ color: "#53FFFF" }}>2 phút</span>
                                            {" "}
                                            Drafting]
                                        </h5>
                                    </div>
                                </div>
                                <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                    4. Time Limit
                                </h5>
                                <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                    Bạn sẽ có tối đa
                                    {" "}
                                    <span style={{ color: "#6CFF5E", fontWeight: "bold" }}>
                                        6 phút
                                    </span>
                                    {" "}
                                    để chơi (trong đó
                                    {" "}
                                    <span style={{ color: "#53FFFF", fontWeight: "bold" }}>
                                        2 phút
                                    </span>
                                    {" "}
                                    chọn operator). Thời gian được tính từ lúc bạn
                                    {" "}
                                    <span style={{ fontWeight: "bold" }}>vào drafting</span>
                                    .
                                </p>
                            </div>
                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div className={"flex flex-col gap-2"}>
                                    <div
                                        className={"flex flex-col items-center justify-center gap-6 sm:flex-row"}
                                    >
                                        <div className={"flex items-center"}>
                                            <Image
                                                alt={"Roadblock"}
                                                className={"size-full object-contain"}
                                                height={122}
                                                src={"/tournament/regulations/tournament-rule-5-1.png"}
                                                width={122}
                                            />
                                            <h3 className={"text-2xl leading-[150%] font-bold text-white md:text-3xl lg:text-5xl"}>
                                                x4
                                            </h3>
                                        </div>
                                        <div className={"relative"}>
                                            <Image
                                                alt={"Specialist"}
                                                className={"size-full object-contain"}
                                                height={122}
                                                src={"/tournament/regulations/tournament-rule-5-2.png"}
                                                width={122}
                                            />
                                            <div
                                                className={"absolute right-0 bottom-0 left-0 m-auto"}
                                            >
                                                <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                        5. Mechanical Ban
                                    </h5>
                                    <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                        Bạn chỉ được dùng tối đa 4 Roadblock và không được dùng
                                        Specialist.
                                    </p>
                                </div>
                            </div>

                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div className={"flex flex-wrap items-center justify-center gap-2"}>
                                    <div className={"relative"}>
                                        <Image
                                            alt={"Hard Ban"}
                                            className={"size-full object-contain"}
                                            height={122}
                                            src={"/tournament/regulations/tournament-char-1.png"}
                                            width={122}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            alt={"Hard Ban"}
                                            className={"size-full object-contain"}
                                            height={122}
                                            src={"/tournament/regulations/tournament-char-2.png"}
                                            width={122}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            alt={"Hard Ban"}
                                            className={"size-full object-contain"}
                                            height={122}
                                            src={"/tournament/regulations/tournament-char-3.png"}
                                            width={122}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            alt={"Hard Ban"}
                                            className={"size-full object-contain"}
                                            height={122}
                                            src={"/tournament/regulations/tournament-char-4.png"}
                                            width={122}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            alt={"Hard Ban"}
                                            className={"size-full object-contain"}
                                            height={122}
                                            src={"/tournament/regulations/tournament-char-5.png"}
                                            width={122}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex flex-col gap-1"}>
                                    <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                        6. Hard Bans & Community Bans
                                    </h5>
                                    <p className={"text-base leading-[125%] text-[#FF5757] italic lg:text-xl"}>
                                        Những Operator phía trên sẽ bị cấm
                                    </p>
                                    <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                        Quý khán giả sẽ được đưa 6 operator khác vào danh sách, nâng
                                        tổng số ban lên
                                        {" "}
                                        <span style={{ fontWeight: "bold" }}>11 Operator</span>
                                        .
                                    </p>
                                </div>
                            </div>

                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div className={"flex w-full flex-wrap justify-center gap-12"}>
                                    <div
                                        className={"flex h-auto flex-col items-center justify-end gap-2"}
                                    >
                                        <div className={"flex flex-1 items-center"}>
                                            <FaRegClock className={"size-20"} fill={"#ffffff"} />
                                        </div>
                                        <div className={"text-base leading-[125%] font-medium text-white lg:text-lg"}>
                                            Thời gian
                                            {" "}
                                            <span style={{ fontWeight: "bold" }}>
                                                chọn Operator
                                            </span>
                                            <br />
                                            Thời gian
                                            {" "}
                                            <span style={{ fontWeight: "bold" }}>in-stage</span>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col items-center justify-end gap-2"}>
                                        <Target className={"size-32"} />
                                        <div className={"text-base leading-[125%] font-medium text-white lg:text-lg"}>
                                            Số địch đánh được
                                            <br />
                                            (số lượng có hạn)
                                        </div>
                                    </div>
                                </div>
                                <div className={"text-base leading-[125%] font-medium text-[#FF6161] italic lg:text-lg"}>
                                    *Trong mọi trường hợp, BTC sẽ là người chấm điểm cuối cùng
                                </div>
                                <div className={"flex max-w-[400px] flex-col gap-1"}>
                                    <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                        7. Tính điểm
                                    </h5>
                                    <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                        BTC sẽ áp dụng cách tính Score Attack, theo các hạng mục như trên
                                    </p>
                                </div>
                            </div>

                            <div
                                className={"embla__slide flex flex-col items-center justify-center gap-4 px-4"}
                            >
                                <div className={"flex flex-col gap-1"}>
                                    <div className={"flex flex-col gap-12 sm:flex-row"}>
                                        <div
                                            className={"flex w-full flex-col justify-end gap-2 sm:w-1/2"}
                                        >
                                            <div className={"flex max-w-[240px] gap-2"}>
                                                <Image
                                                    alt={"Tính điểm"}
                                                    className={"w-1/3 object-contain"}
                                                    height={122}
                                                    src={"/tournament/regulations/tournament-rule-7.png"}
                                                    width={122}
                                                />
                                                <Image
                                                    alt={"Tính điểm"}
                                                    className={"w-1/3 object-contain"}
                                                    height={122}
                                                    src={"/tournament/regulations/tournament-rule-7.png"}
                                                    width={122}
                                                />
                                                <Image
                                                    alt={"Tính điểm"}
                                                    className={"w-1/3 object-contain"}
                                                    height={122}
                                                    src={"/tournament/regulations/tournament-rule-7.png"}
                                                    width={122}
                                                />
                                            </div>
                                            <div className={"text-center text-base leading-[125%] font-medium text-white lg:text-lg"}>
                                                <span style={{ fontWeight: "bold" }}>
                                                    Line up squad
                                                </span>
                                                <br />
                                                của bạn đến đâu
                                            </div>
                                        </div>
                                        <div
                                            className={"flex w-full flex-col justify-end gap-2 sm:w-1/2"}
                                        >
                                            <div className={"flex flex-1 items-center"}>
                                                <ProgressBar className={"h-auto w-full"} />
                                            </div>
                                            <div className={"text-center text-base leading-[125%] font-medium text-white lg:text-lg"}>
                                                Bạn đánh
                                                {" "}
                                                <span style={{ fontWeight: "bold" }}>Theresa</span>
                                                <br />
                                                đến đâu
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"text-base leading-[125%] font-medium text-[#FF6161] italic lg:text-lg"}>
                                    *Trong mọi trường hợp, BTC sẽ là người chấm điểm cuối cùng
                                </div>
                                <div className={"flex max-w-[400px] flex-col gap-1"}>
                                    <h5 className={"text-xl leading-[150%] font-bold text-white lg:text-2xl"}>
                                        8. Tính điểm
                                    </h5>
                                    <p className={"text-base leading-[125%] text-white lg:text-xl"}>
                                        BTC sẽ áp dụng cách tính Score Attack, theo các hạng mục như
                                        trên
                                    </p>
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
