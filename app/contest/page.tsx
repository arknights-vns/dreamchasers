import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import TournamentLogo from "@/public/tournament/regulations/tournament-logo.png";

export default function OverviewPage() {
    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <PageTitle favorText={""} title={"\"Battle of Dreamchasers\""} />
            <div
                className={"flex flex-1/2 flex-col items-center justify-center space-y-4"}
            >
                <div className={"mx-4 max-w-192 text-center text-2xl font-extralight text-white"}>
                    Đây là giải đấu được BTC thực hiện nhằm để thử thách giới hạn của các Doctor
                    trong buổi Offline. Các Doctor hoàn toàn có thể sử dụng mọi chiến thuật sáng
                    tạo và hiệu quả để vượt qua thử thách mà BTC đã chuẩn bị từ trước.
                    <br />
                    Sẽ có những phần quà
                    thú vị để thưởng cho các Doctor mang đến kết quả đáng kinh ngạc nhất vào cuối
                    buổi chương trình!
                </div>
                <div className={"grid grid-cols-1 justify-center space-y-4 md:grid-cols-3 md:space-x-8"}>
                    <Link className={"btn min-w-[256px] rounded-2xl border-white/50 bg-white text-black btn-sm hover:border-1 hover:bg-black hover:text-white md:btn-md lg:btn-lg"} href={"/contest/rules"} type={"button"}>Tổng quan</Link>
                    <Link className={"btn min-w-[256px] rounded-2xl border-white/50 bg-white text-black btn-sm hover:border-1 hover:bg-black hover:text-white md:btn-md lg:btn-lg"} href={"/contest/scoring"} type={"button"}>Tính điểm</Link>
                    <Link className={"btn min-w-[256px] rounded-2xl border-white/50 bg-white text-black btn-sm hover:border-1 hover:bg-black hover:text-white md:btn-md lg:btn-lg"} href={"/contest/prizes"} type={"button"}>Giải thưởng</Link>
                </div>
                <Image alt={"Tournament Logo"} className={"relative"} src={TournamentLogo} />
            </div>
        </div>
    );
}
