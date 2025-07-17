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
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle title={"Luật chơi"} favorText={""} dark />
                </div>
            </div>
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
                                    onClick={() => emblaApi?.scrollTo(index)}
                                    className={`h-1 w-full cursor-pointer bg-white transition-all duration-300 ${
                                        index === currentSlide ? "opacity-100" : "opacity-50"
                                    }`}
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
                                    src={"/tournament/regulations/tournament-rule-1.png"}
                                    alt={"Rule 1"}
                                    width={1600}
                                    height={1000}
                                    className={"w-full max-w-[480px] object-cover"}
                                />
                                <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                    1. Map
                                </h5>
                                <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                        src={"/tournament/regulations/amiya-char.png"}
                                        alt={"Amiya Medic"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Operator Slot"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Operator Slot"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Operator Slot"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            alt={"Operator Slot"}
                                            width={320}
                                            height={640}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            alt={"Operator Slot"}
                                            width={320}
                                            height={640}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Operator Slot"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Operator Slot"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Rule 2"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <Image
                                        src={"/tournament/regulations/tournament-rule-7.png"}
                                        alt={"Operator Slot"}
                                        width={320}
                                        height={640}
                                        className={"w-[16.666%] object-cover"}
                                    />
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            alt={"Operator Slot"}
                                            width={320}
                                            height={640}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative w-[16.666%]"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-rule-7.png"}
                                            alt={"Operator Slot"}
                                            width={320}
                                            height={640}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div
                                            className={"absolute inset-0 flex items-center justify-center"}
                                        >
                                            <FaBan className={"h-18 w-20"} fill={"red"} />
                                        </div>
                                    </div>
                                </div>
                                <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                    2. Team build
                                </h5>
                                <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                            src={"/tournament/regulations/tournament-rule-3-1.png"}
                                            alt={"Leak địch"}
                                            width={320}
                                            height={640}
                                            className={"my-auto w-full object-contain"}
                                        />
                                        <p className={"text-base lg:text-xl font-bold text-white leading-[125%]"}>
                                            Leak địch
                                        </p>
                                    </div>
                                    <div
                                        className={"flex h-full w-full max-w-[120px] flex-col justify-between gap-2 sm:w-1/3"}
                                    >
                                        <Image
                                            src={"/tournament/regulations/tournament-rule-3-2.png"}
                                            alt={"Pause / Pause trick"}
                                            width={320}
                                            height={640}
                                            className={"my-auto w-full object-contain"}
                                        />
                                        <p className={"text-base lg:text-xl font-bold text-white leading-[125%]"}>
                                            Pause / Pause trick
                                        </p>
                                    </div>
                                    <div
                                        className={"flex h-full w-full max-w-[120px] flex-col justify-between gap-2 sm:w-1/3"}
                                    >
                                        <Image
                                            src={"/tournament/regulations/tournament-rule-3-3.png"}
                                            alt={"Điều chỉnh tốc độ"}
                                            width={320}
                                            height={640}
                                            className={"my-auto w-full object-contain"}
                                        />
                                        <p className={"text-base lg:text-xl font-bold text-white leading-[125%]"}>
                                            Điều chỉnh tốc độ
                                        </p>
                                    </div>
                                </div>
                                <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                    3. Gameplay - Rules
                                </h5>
                                <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                    <FaRegClock className={"h-20 w-20 mr-8"} fill={"#ffffff"} />
                                    <div>
                                        <h5 className={"text-xl lg:text-2xl font-medium text-white leading-[150%]"}>
                                            <span style={{ color: "#6CFF5E" }}>6 phút</span>
                                            {" "}
                                            Gameplay
                                        </h5>
                                        <h5 className={"text-xl lg:text-2xl font-medium text-white leading-[150%] mt-2"}>
                                            [
                                            <span style={{ color: "#53FFFF" }}>2 phút</span>
                                            {" "}
                                            Drafting]
                                        </h5>
                                    </div>
                                </div>
                                <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                    4. Time Limit
                                </h5>
                                <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                                src={"/tournament/regulations/tournament-rule-5-1.png"}
                                                alt={"Roadblock"}
                                                width={122}
                                                height={122}
                                                className={"h-full w-full object-contain"}
                                            />
                                            <h3 className={"text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-[150%]"}>
                                                x4
                                            </h3>
                                        </div>
                                        <div className={"relative"}>
                                            <Image
                                                src={"/tournament/regulations/tournament-rule-5-2.png"}
                                                alt={"Specialist"}
                                                width={122}
                                                height={122}
                                                className={"h-full w-full object-contain"}
                                            />
                                            <div
                                                className={"absolute right-0 bottom-0 left-0 m-auto"}
                                            >
                                                <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                        5. Mechanical Ban
                                    </h5>
                                    <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                            src={"/tournament/regulations/tournament-char-1.png"}
                                            alt={"Hard Ban"}
                                            width={122}
                                            height={122}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-char-2.png"}
                                            alt={"Hard Ban"}
                                            width={122}
                                            height={122}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-char-3.png"}
                                            alt={"Hard Ban"}
                                            width={122}
                                            height={122}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-char-4.png"}
                                            alt={"Hard Ban"}
                                            width={122}
                                            height={122}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                    <div className={"relative"}>
                                        <Image
                                            src={"/tournament/regulations/tournament-char-5.png"}
                                            alt={"Hard Ban"}
                                            width={122}
                                            height={122}
                                            className={"h-full w-full object-contain"}
                                        />
                                        <div className={"absolute right-0 -bottom-4 left-0 m-auto"}>
                                            <FaBan className={"m-auto h-12 w-14"} fill={"red"} />
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex flex-col gap-1"}>
                                    <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                        6. Hard Bans & Community Bans
                                    </h5>
                                    <p className={"text-base lg:text-xl text-[#FF5757] leading-[125%] italic"}>
                                        Những Operator phía trên sẽ bị cấm
                                    </p>
                                    <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                            <FaRegClock className={"h-20 w-20"} fill={"#ffffff"} />
                                        </div>
                                        <div className={"text-base lg:text-lg font-medium text-white leading-[125%]"}>
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
                                        <Target className={"h-32 w-32"} />
                                        <div className={"text-base lg:text-lg font-medium text-white leading-[125%]"}>
                                            Số địch đánh được
                                            <br />
                                            (số lượng có hạn)
                                        </div>
                                    </div>
                                </div>
                                <div className={"text-base lg:text-lg font-medium text-[#FF6161] leading-[125%] italic"}>
                                    *Trong mọi trường hợp, BTC sẽ là người chấm điểm cuối cùng
                                </div>
                                <div className={"flex max-w-[400px] flex-col gap-1"}>
                                    <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                        7. Tính điểm
                                    </h5>
                                    <p className={"text-base lg:text-xl text-white leading-[125%]"}>
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
                                                    src={"/tournament/regulations/tournament-rule-7.png"}
                                                    alt={"Tính điểm"}
                                                    width={122}
                                                    height={122}
                                                    className={"w-1/3 object-contain"}
                                                />
                                                <Image
                                                    src={"/tournament/regulations/tournament-rule-7.png"}
                                                    alt={"Tính điểm"}
                                                    width={122}
                                                    height={122}
                                                    className={"w-1/3 object-contain"}
                                                />
                                                <Image
                                                    src={"/tournament/regulations/tournament-rule-7.png"}
                                                    alt={"Tính điểm"}
                                                    width={122}
                                                    height={122}
                                                    className={"w-1/3 object-contain"}
                                                />
                                            </div>
                                            <div className={"text-base lg:text-lg font-medium text-white leading-[125%] text-center"}>
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
                                            <div className={"text-base lg:text-lg font-medium text-white leading-[125%] text-center"}>
                                                Bạn đánh
                                                {" "}
                                                <span style={{ fontWeight: "bold" }}>Theresa</span>
                                                <br />
                                                đến đâu
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"text-base lg:text-lg font-medium text-[#FF6161] leading-[125%] italic"}>
                                    *Trong mọi trường hợp, BTC sẽ là người chấm điểm cuối cùng
                                </div>
                                <div className={"flex max-w-[400px] flex-col gap-1"}>
                                    <h5 className={"text-xl lg:text-2xl font-bold text-white leading-[150%]"}>
                                        8. Tính điểm
                                    </h5>
                                    <p className={"text-base lg:text-xl text-white leading-[125%]"}>
                                        BTC sẽ áp dụng cách tính Score Attack, theo các hạng mục như
                                        trên
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => emblaApi?.scrollNext()}
                        className={"absolute top-1/2 -right-[2.5%] hidden md:block lg:-right-24"}
                    >
                        <IoIosArrowDropright
                            className={"h-12 w-12 cursor-pointer lg:h-20 lg:w-20"}
                            fill={"#ffffff"}
                        />
                    </div>
                    <div
                        onClick={() => emblaApi?.scrollPrev()}
                        className={"absolute top-1/2 -left-[2.5%] hidden md:block lg:-left-24"}
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
