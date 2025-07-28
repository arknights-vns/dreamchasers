import { AiFillClockCircle } from "react-icons/ai";

type TimelineItemProps = {
    date: string;
    data: string;
    // href: string;
    /*
        This item is the start of timeline.
     */
    head?: boolean;
    /*
        This item is the end of timeline.
     */
    tail?: boolean;
    /*
        This PREVIOUS item is finished.
     */
    middle?: boolean;
    /*
        This item is in the right side of timeline.
        NOTE: applies to small screens only.
     */
    right?: boolean;
};

export default function TimelineItem(props: TimelineItemProps) {
    // On mobile (vertical timeline), use timeline-start for left and timeline-end for right
    // On desktop (horizontal timeline), all items use timeline-start, time lies at bottom.
    const timelinePosition = props.right ? "timeline-end md:timeline-start!" : "timeline-start";

    return (
        <li className={"text-base-content flex-1 shrink"}>
            {!props.head ? <hr className={"bg-white"} /> : <></>}
            <div
                className={
                    `${timelinePosition} text-base-content flex flex-col px-4 py-2 text-center text-lg lg:text-xl`
                }
            >
                <div className={"mb-1 block font-bold md:hidden"}>{props.date}</div>
                <div className={"leading-relaxed font-light whitespace-pre-line"}>{props.data}</div>
            </div>
            <div className={"timeline-middle"}>
                <AiFillClockCircle fill={"white"} size={24} />
            </div>
            <div className={"timeline-end"}>
                <div className={"mb-1 hidden font-bold md:block"}>{props.date}</div>
            </div>
            {!props.tail ? <hr className={"bg-white"} /> : <></>}
        </li>
    );
}
