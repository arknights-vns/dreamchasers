import type { CrewMember } from "@/lib/vns";
import Image from "next/image";

export default function MemberBox(props: CrewMember) {
    return (
        <div className={"mb-4 flex max-h-64 min-w-64 flex-col gap-y-2 items-center"}>
            <Image
                className={"ring-1 ring-white/50 rounded-full"}
                src={`/crew/${props.name}.png`}
                width={100}
                height={100}
                alt={"VNS_Crew"}
            />
            <div className={"text-xl font-extrabold text-base-content"}>{props.name}</div>
            {/* {props.quote !=P= "" && ( */}
            {/*    <div className={"text-md text-base-content text-center font-extralight italic"}> */}
            {/*        &#34;{props.quote}&#34; */}
            {/*    </div> */}
            {/* )} */}
            <div className={"space-x-2"}>
                {Array.isArray(props.role)
                    && props.role.map((role: string) => (
                        <span
                            key={role}
                            className={`font-extrabold crew-role-container ${role}`}
                        >
                            {role.replaceAll("-", " ")}
                        </span>
                    ))}
            </div>
        </div>
    );
}
