import { RiHourglass2Fill } from "react-icons/ri";
import PageTitle from "@/components/PageTitle";
import TimelineItem from "@/components/TimelineItem";

export default function SchedulePage() {
    return (
        <div className={"h-visible vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"text-center hero-content"}>
                    <PageTitle title={"Lịch trình"} favorText={""} dark />
                </div>
            </div>
            <div className={"flex flex-1/2 flex-col justify-center items-center"} data-theme={"dark"}>
                <ul className={"timeline timeline-vertical md:timeline-horizontal flex w-full"}>
                    <TimelineItem date={"09:15"} data={"Mở Check-in\n&\nBắt đầu Offline"} head />

                    <TimelineItem date={"09:30"} data={"Mini-games"} right />

                    <TimelineItem date={"12:20"} data={"Gacha banner"} />

                    <TimelineItem date={"13:25"} data={"Mini-Tournament"} right />

                    <TimelineItem
                        date={"15:00"}
                        data={"Special Program\n&\nKết thúc event"}
                        tail
                    />
                </ul>
                <RiHourglass2Fill fill={"white"} size={32} />
            </div>
        </div>
    );
}
