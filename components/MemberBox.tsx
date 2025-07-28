import type { CrewMember } from "@/lib/vns";
import Image from "next/image";

export default function MemberBox(props: CrewMember) {
    return (
        <div className={"mb-4 flex max-h-64 min-w-64 flex-col items-center gap-y-2"}>
            <Image
                alt={"VNS_Crew"}
                className={"rounded-full ring-1 ring-white/50"}
                height={100}
                src={`/crew/${props.name}.jpg`}
                width={100}
            />
            <div className={"text-base-content text-xl font-extrabold"}>{props.name}</div>
            {/* {props.quote !=P= "" && ( */}
            {/*    <div className={"text-md text-base-content text-center font-extralight italic"}> */}
            {/*        &#34;{props.quote}&#34; */}
            {/*    </div> */}
            {/* )} */}
            <div className={"space-x-2"}>
                {Array.isArray(props.roles)
                    && props.roles.map((role: string) => (
                        <span
                            key={role}
                            className={`crew-role-container font-extrabold ${role}`}
                        >
                            {role.replaceAll("-", " ")}
                        </span>
                    ))}
            </div>
        </div>
    );
}
