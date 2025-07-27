import { RiHourglass2Fill } from "react-icons/ri";
import PageTitle from "@/components/PageTitle";
import TimelineItem from "@/components/TimelineItem";

export default function SchedulePage() {
    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <PageTitle favorText={"Các sự kiện sẽ diễn ra trong offline"} title={"Timeline sự kiện"} />

            <div className={"flex flex-1/2 flex-col items-center justify-center"} data-theme={"dark"}>
                <ul className={"timeline timeline-vertical flex w-full md:timeline-horizontal"}>
                    <TimelineItem data={"Mở Check-in\n&\nBắt đầu Offline"} date={"09:15"} head />

                    <TimelineItem data={"Mini-games"} date={"09:30"} right />

                    <TimelineItem data={"Gacha banner"} date={"12:20"} />

                    <TimelineItem data={"Mini-Tournament"} date={"13:25"} right />

                    <TimelineItem
                        data={"Special Program\n&\nKết thúc event"}
                        date={"15:00"}
                        tail
                    />
                </ul>
                <RiHourglass2Fill fill={"white"} size={32} />
            </div>
        </div>
    );
}
