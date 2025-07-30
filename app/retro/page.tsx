import PageTitle from "@/components/PageTitle";
import RetroItem from "@/components/RetroItem";
import Dreamchasers from "@/public/retro/dreamchasers/dreamchasers.jpg";
import TheShowMustGoOn from "@/public/retro/the-show-must-go-on/the-show-must-go-on.jpg";

export default function RetroPage() {
    return (
        <div className={"flex h-visible flex-col bg-vns"}>
            <PageTitle
                favorText={"Nơi lưu giữ album của những buổi Offline."}
                title={"Kỷ niệm"}
            />

            <div className={`
                mx-auto mb-8 flex flex-1/2 flex-col items-center justify-center
                space-y-4
            `}
            >
                <RetroItem
                    description={"Offline đầu tiên của VNS, cũng như là tiền đề cho Dreamchasers và VNS Network."}
                    href={"/retro/the-show-must-go-on"}
                    imageSrc={TheShowMustGoOn}
                    title={"Arknights VNS Offline 2024: The Show Must Go On!"}
                />

                <RetroItem
                    description={"COMING SOON!"}
                    href={"#"}
                    imageSrc={Dreamchasers}
                    title={"Arknights VNS Offline 2025: Dreamchasers"}
                />
            </div>
        </div>
    );
}
