import Image from "next/image";
import Meruko from "@/public/tournament/Meruko.png";

export default function NotFoundPage() {
    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <div
                className={"m-5 flex flex-col items-center justify-center"}
            >
                {/* Participation Factors */}
                <section className={"mx-5 mb-8"}>
                    <h2 className={"mb-4 text-center text-4xl font-semibold text-white"}>
                        Yếu tố tính điểm
                    </h2>
                    <ul className={"list-disc space-y-2 text-lg text-white"}>
                        <li>Thời gian bạn chọn operator.</li>
                        <li>Thời gian 1 màn chạy.</li>
                        <li>Số địch đánh được - không bao gồm leak.</li>
                        <li>Bạn đánh Theresa tới đâu - cả phase 1 lẫn phase 2.</li>
                        <li>Squad bạn sử dụng - rarity, số lượng.</li>
                        {/* <li>Số roadblock bạn xài.</li> */}
                    </ul>
                </section>

                {/* Overview */}
                <section className={"mb-8"}>
                    <h2 className={"mb-4 text-center text-4xl font-semibold text-white"}>
                        Tổng quan
                    </h2>
                    <div className={"space-y-6"}>
                        {/* Draft Score */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <p className={"mb-2 text-lg font-bold text-white"}>
                                Thời gian chọn Operator:
                                {" "}
                                <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                    S
                                    <sub>draft</sub>
                                    {" "}
                                    = 120
                                    <strong>s</strong>
                                    {" "}
                                    - t
                                    <sub>draft</sub>
                                </span>
                            </p>
                        </div>

                        {/* Run Score */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <p className={"mb-2 text-lg font-bold text-white"}>
                                Thời gian 1 màn chạy:
                                {" "}
                                <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                    S
                                    <sub>run</sub>
                                    {" "}
                                    = 1.5 × (300
                                    <strong>s</strong>
                                    {" "}
                                    - t
                                    <sub>run</sub>
                                    )
                                </span>
                            </p>
                            <div className={"space-y-1 pl-4 text-sm text-white"}>
                                <ul className={"list-disc"}>
                                    <li>
                                        t
                                        <sub>run</sub>
                                        {" "}
                                        là thời gian của cả 1 run, tính từ lúc bấm
                                        {" "}
                                        <span className={"font-bold"}>Start Operation → Mission Accomplished</span>
                                        .
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Enemy Score */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <p className={"mb-2 text-lg font-bold text-white"}>
                                Số địch đánh được:
                                {" "}
                                <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                    S
                                    <sub>enemy</sub>
                                    {" "}
                                    = 2 ×
                                    {" "}
                                    <strong>enemy</strong>
                                </span>
                            </p>
                            <div className={"space-y-1 pl-4 text-sm text-white"}>
                                <ul className={"list-disc"}>
                                    <li>Không tính leak nha, dĩ nhiên rồi.</li>
                                    <li>Số địch tối đa tụi mình sẽ tính điểm là 25.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Theresa Score */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <p className={"mb-2 text-lg font-bold text-white"}>
                                Bạn đánh Theresa tới đâu (
                                <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                    S
                                    <sub>queen</sub>
                                </span>
                                ):
                            </p>
                            <ul className={"list-disc space-y-1 pl-4 text-sm text-white"}>
                                <li>
                                    Có tham gia tournament:
                                    {" "}
                                    <span className={"font-semibold text-green-300"}>+5</span>
                                </li>
                                <li>
                                    Vượt qua phase 1:
                                    {" "}
                                    <span className={"font-semibold text-green-300"}>+25</span>
                                </li>
                                <li>
                                    Vượt qua phase 2:
                                    {" "}
                                    <span className={"font-semibold text-green-300"}>+50</span>
                                </li>
                                <li className={"font-bold text-red-300"}>
                                    Để tránh hiểu sai thì xong 2 phase =
                                    {" "}
                                    <span className={"font-semibold text-green-300"}>+80</span>
                                </li>
                            </ul>
                        </div>

                        {/* Squad Composition */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <p className={"mb-2 text-lg font-bold text-white"}>
                                Squad bạn sử dụng (
                                <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                    S
                                    <sub>comp</sub>
                                </span>
                                ):
                            </p>
                            <ul className={"list-disc space-y-1 pl-4 text-sm text-white"}>
                                <li>
                                    <span className={"font-semibold text-green-300"}>+20</span>
                                    {" "}
                                    cho mỗi slot op để trống.
                                </li>
                                <li>
                                    <span className={"font-semibold text-green-300"}>+2</span>
                                    {" "}
                                    cho mỗi operator không phải 6* (
                                    <strong>không tính Amiya Medic</strong>
                                    ).
                                </li>
                                <li>
                                    <span className={"font-semibold text-green-300"}>+3</span>
                                    {" "}
                                    cho mỗi operator trong list dưới đây:
                                </li>
                            </ul>
                            <ul className={"mt-2 list-disc space-y-1 pl-8 text-sm text-white"}>
                                <li className={"font-bold"}>
                                    Civilight Eterna
                                </li>
                                <li className={"font-bold text-red-400"}>
                                    Exusiai
                                </li>
                                <li className={"font-bold text-cyan-400"}>
                                    Rosmontis
                                </li>
                                <li className={"font-bold text-amber-600"}>
                                    Angelina
                                </li>
                                <li className={"font-bold text-pink-300"}>
                                    Lin
                                </li>
                                <li className={"font-bold text-green-300"}>
                                    Muelsyse
                                </li>
                                {/* <li className={"flex items-start"}>
                                    <span className={"text-purple-500 mr-2"}>◦</span>
                                    TBA
                                </li> */}
                            </ul>
                        </div>

                        {/* Total Score Formula */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <p className={"mb-2 text-center text-lg font-bold text-white"}>
                                Điểm của 1 màn chạy = tổng các điểm thành phần
                            </p>
                            <div className={"my-4 text-center"}>
                                <span className={"rounded-sm bg-gray-300/15 px-4 py-2 font-mono text-lg text-white"}>
                                    S
                                    <sub>member</sub>
                                    {" "}
                                    = S
                                    <sub>draft</sub>
                                    {" "}
                                    + S
                                    <sub>run</sub>
                                    {" "}
                                    + S
                                    <sub>queen</sub>
                                    {" "}
                                    + S
                                    <sub>enemy</sub>
                                    {" "}
                                    + S
                                    <sub>comp</sub>
                                </span>
                            </div>
                            {/* <div className={"text-sm text-gray-600 space-y-1"}>
                                <p>
                                    Hiện tại thì chưa nghĩ ra S
                                    <sub>bonus</sub>
                                    {" "}
                                    là gì, nên tạm là 0.
                                </p>
                                <p className={"pl-4"}>Có thể sẽ tính theo độ hype của member chẳng hạn.</p>
                                <p>
                                    S
                                    <sub>bonus</sub>
                                    {" "}
                                    sẽ
                                    <strong>không bao giờ</strong>
                                    {" "}
                                    vượt quá 5.
                                </p>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Example */}
                <section className={"mb-8"}>
                    <h2 className={"mb-4 text-center text-4xl font-semibold text-white"}>
                        Ví dụ
                    </h2>

                    <div className={"space-y-6"}>
                        {/* Meruko Example */}
                        <div className={"rounded-lg border-1 border-white/50 bg-black p-4"}>
                            <h3 className={"mb-4 text-lg font-semibold text-white"}>
                                Lấy ví dụ run của Meruko - 1 tester của team:
                            </h3>

                            <ul className={"mb-4 list-disc space-y-2 pl-4 text-white"}>
                                <li>
                                    Meruko draft trong 50
                                    <strong>s</strong>
                                    , tức là còn lại 70
                                    <strong>s</strong>
                                    .
                                </li>
                                <li>
                                    Meruko hoàn thành run trong 04
                                    <strong>m</strong>
                                    01
                                    <strong>s</strong>
                                    ,
                                    <em>
                                        {" "}
                                        để tiện tính thì làm tròn luôn
                                    </em>
                                    , sẽ là dư 120
                                    <strong>s</strong>
                                    .
                                </li>
                                <li>Meruko clear cả 2 phase của Theresa.</li>
                                <li>Có 14 enemy count trong run này.</li>
                                <li>
                                    Meruko mang theo squad này:
                                    {" "}
                                    <Image alt={""} src={Meruko}></Image>
                                </li>
                            </ul>

                            <div className={"mt-6"}>
                                <h4 className={"mb-3 text-lg font-semibold text-white"}>Điểm thành phần:</h4>
                                <div className={"grid grid-cols-1 gap-4 text-sm text-white md:grid-cols-2"}>
                                    <ul className={"list-disc space-y-1 pl-4"}>
                                        <li>
                                            Chọn Operator:
                                            {" "}
                                            <span className={"font-bold"}>70</span>
                                        </li>
                                        <li>
                                            Màn chạy:
                                            {" "}
                                            <span className={"font-bold"}>1.5 × 120 = 180</span>
                                        </li>
                                        <li>
                                            Địch:
                                            {" "}
                                            <span className={"font-bold"}>2 × 14 = 28</span>
                                        </li>
                                        <li>
                                            Theresa:
                                            {" "}
                                            <span className={"font-bold"}>80</span>
                                        </li>
                                    </ul>
                                    <ul className={"list-disc space-y-1 pl-4"}>
                                        <li>
                                            Các Operator không phải 6*:
                                            {" "}
                                            <span className={"font-bold"}>0</span>
                                        </li>
                                        <li>Squad mang theo:</li>
                                        <ul className={"list-disc space-y-1 pl-4"}>
                                            <li>
                                                8/8 slot:
                                                {" "}
                                                <span className={"font-bold"}>+0</span>
                                            </li>
                                            <li>
                                                Lin:
                                                {" "}
                                                <span className={"font-bold"}>+3</span>
                                            </li>
                                            <li>
                                                Muelsyse:
                                                {" "}
                                                <span className={"font-bold"}>+3</span>
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>

                            <div className={"mt-4 rounded-sm border-1 border-white/50 bg-gray-300/15 p-4"}>
                                <p className={"text-center font-semibold text-white"}>
                                    Tổng điểm
                                </p>
                                <div className={"mt-2 text-center"}>
                                    <span className={"rounded-sm bg-gray-300/30 px-4 py-2 font-mono text-white"}>
                                        S
                                        <sub>Meruko</sub>
                                        {" "}
                                        = 70 + 180 + 28 + 80 + 0 + 3 + 3 = 364
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
