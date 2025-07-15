import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import TournamentLogo from "@/public/tournament/regulations/tournament-logo.png";

export default function OverviewPage() {
    return (
        <div className={"h-visible vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle title={"\"Battle of Dreamchasers\""} favorText={""} dark />
                </div>
            </div>
            <div
                className={"flex flex-1/2 flex-col items-center justify-center space-y-4"}
                data-theme={"dark"}
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
                <div className={"grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-x-8 justify-center"}>
                    <Link href={"/battle-of-dreamchasers/rules"} type={"button"} className={"btn btn-sm md:btn-md lg:btn-lg min-w-[256px] bg-white text-black rounded-2xl hover:bg-black hover:text-white hover:border-1 border-white/50"}>Tổng quan</Link>
                    <Link href={"/battle-of-dreamchasers/scoring"} type={"button"} className={"btn btn-sm md:btn-md lg:btn-lg min-w-[256px] bg-white text-black rounded-2xl hover:bg-black hover:text-white hover:border-1 border-white/50"}>Tính điểm</Link>
                    <Link href={"/battle-of-dreamchasers/prizes"} type={"button"} className={"btn btn-sm md:btn-md lg:btn-lg min-w-[256px] bg-white text-black rounded-2xl hover:bg-black hover:text-white hover:border-1 border-white/50"}>Giải thưởng</Link>
                </div>
                <Image src={TournamentLogo} alt={"Tournament Logo"} className={"relative"} />
            </div>
        </div>
    );
}
