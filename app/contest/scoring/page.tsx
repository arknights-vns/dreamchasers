import PageTitle from "@/components/PageTitle";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ScoringPage() {
    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <PageTitle favorText={"Một số thông tin để giúp bạn lên kế hoạch cho Mini-Tournament"} title={"Tính điểm"} />
            <div className={"m-5 flex flex-col items-center justify-center"}>
                <section className={"mx-5 mb-8 flex w-full max-w-3xl flex-col items-center justify-center"}>
                    <div className={"mb-8 text-center text-4xl text-white"}>1. Các yếu tố tham gia</div>
                    <ul className={"list-disc space-y-2 pl-4 text-lg text-white"}>
                        <li>Thời gian bạn chọn operator.</li>
                        <li>Thời gian 1 màn chạy.</li>
                        <li>Số địch đánh được - không bao gồm leak.</li>
                        <li>Bạn đánh Theresa tới đâu - cả phase 1 lẫn phase 2.</li>
                        <li>Squad bạn sử dụng - rarity, số lượng.</li>
                    </ul>
                </section>
                <section className={"mb-8 w-full max-w-3xl"}>
                    <div className={"mb-8 text-center text-4xl text-white"}>2. Cách tính điểm thành phần</div>
                    <div className={"space-y-6"}>
                        {/* Draft time */}
                        <Card className={"bg-black"}>
                            <CardHeader>
                                <CardTitle className={"text-lg text-white"}>
                                    Thời gian chọn Operator
                                    {": "}
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
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className={"list-disc space-y-1 pl-4 text-sm text-white"}>
                                    <li>
                                        t
                                        <sub>draft</sub>
                                        {" "}
                                        tính từ lúc bấm
                                        {" "}
                                        <span className={"font-bold"}>Start Operation</span>
                                        .
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                        {/* IGT */}
                        <Card className={"bg-black"}>
                            <CardHeader>
                                <CardTitle className={"text-lg text-white"}>
                                    Thời gian 1 màn chạy
                                    {": "}
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
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className={"list-disc space-y-1 pl-4 text-sm text-white"}>
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
                            </CardContent>
                        </Card>
                        {/* Head count */}
                        <Card className={"bg-black"}>
                            <CardHeader>
                                <CardTitle className={"text-lg text-white"}>
                                    Số địch đánh được
                                    {": "}
                                    <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                        S
                                        <sub>enemy</sub>
                                        {" "}
                                        = 2 ×
                                        {" "}
                                        <strong>enemy</strong>
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className={"mt-2 list-disc space-y-1 pl-4 text-sm text-white"}>
                                    <li>Không tính leak nha, dĩ nhiên rồi.</li>
                                    <li>Số địch tối đa tụi mình sẽ tính điểm là 25.</li>
                                </ul>
                            </CardContent>
                        </Card>
                        {/* Progression */}
                        <Card className={"bg-black"}>
                            <CardHeader>
                                <CardTitle className={"text-lg text-white"}>
                                    Bạn đánh Theresa tới đâu
                                    {": "}
                                    <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                        S
                                        <sub>queen</sub>
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                        {/* Comp */}
                        <Card className={"bg-black"}>
                            <CardHeader>
                                <CardTitle className={"text-lg text-white"}>
                                    Squad bạn sử dụng
                                    {": "}
                                    <span className={"rounded-sm bg-gray-300/15 px-2 py-1 text-white"}>
                                        S
                                        <sub>comp</sub>
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
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
                                    <li className={"font-bold"}>Civilight Eterna</li>
                                    <li className={"font-bold"}><span className={"text-red-400"}>Exusiai</span></li>
                                    <li className={"font-bold"}><span className={"text-cyan-400"}>Rosmontis</span></li>
                                    <li className={"font-bold"}><span className={"text-amber-500"}>Angelina</span></li>
                                    <li className={"font-bold"}><span className={"text-pink-300"}>Lin</span></li>
                                    <li className={"font-bold"}><span className={"text-green-300"}>Muelsyse</span></li>
                                </ul>
                            </CardContent>
                        </Card>
                        {/* Total */}
                        <Card className={"bg-black"}>
                            <CardHeader>
                                <CardTitle className={"text-center text-lg text-white"}>Điểm của 1 màn chạy = tổng các điểm thành phần</CardTitle>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className={"mb-8 w-full max-w-3xl"}>
                    <div className={"mb-8 text-center text-4xl text-white"}>3. Ví dụ</div>
                    <Card className={"bg-black"}>
                        <CardHeader>
                            <CardTitle className={"text-lg text-white"}>Lấy ví dụ run của Meruko - 1 tester của team:</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                    {" "}
                                    01
                                    <strong>s</strong>
                                    ,
                                    {" "}
                                    <em>để tiện tính thì làm tròn luôn</em>
                                    , tức là còn lại 120
                                    <strong>s</strong>
                                    .
                                </li>
                                <li>Meruko clear cả 2 phase của Theresa.</li>
                                <li>Có 14 enemy count trong run này.</li>
                                <li>
                                    Squad của Meruko bao gồm: Eyjafjalla, Reed the Flame Shadow,
                                    {" "}
                                    <span className={"font-bold text-green-300"}>Muelsyse</span>
                                    , Shu, Gavial the Invincible,
                                    {" "}
                                    <span className={"font-bold text-pink-300"}>Lin</span>
                                    , Młynar, Amiya (Medic)
                                </li>
                            </ul>
                            <div className={"mt-6"}>
                                <h4 className={"mb-3 text-lg font-semibold text-white"}>Điểm thành phần:</h4>
                                <div className={"grid grid-cols-2 text-sm text-white"}>
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
                                        <li>
                                            Squad mang theo:
                                            <ul className={"list-disc space-y-1 pl-4"}>
                                                <li>
                                                    8/8 slot:
                                                    {" "}
                                                    <span className={"font-bold"}>+0</span>
                                                </li>
                                                <li>
                                                    <span className={"font-bold text-pink-300"}>Lin</span>
                                                    {": "}
                                                    <span className={"font-bold"}>+3</span>
                                                </li>
                                                <li>
                                                    <span className={"font-bold text-green-300"}>Muelsyse</span>
                                                    {": "}
                                                    <span className={"font-bold"}>+3</span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={"mt-4 flex flex-col rounded-sm bg-neutral-700 p-4"}>
                                <p className={"text-center font-semibold text-white"}>Tổng điểm</p>
                                <div className={"mt-2 flex-nowrap text-center"}>
                                    <span className={"rounded-sm bg-neutral-900 px-4 py-2 font-mono text-white"}>
                                        S
                                        <sub>Meruko</sub>
                                        {" "}
                                        = 70 + 180 + 28 + 80 + 0 + 3 + 3 = 364
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
