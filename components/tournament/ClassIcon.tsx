import type { OperatorClass } from "@/lib/vns";
import { clsx } from "clsx";
import Image from "next/image";

type ClassIconProps = {
    operatorClass: OperatorClass;
    active: boolean;
    onClick?: () => void;
};

function ClassIcon(props: ClassIconProps) {
    return (
        <div
            className={clsx("flex size-9 items-center justify-center border border-white/50", props.active
                ? "bg-blue-400"
                : "bg-black")}
            onClick={props.onClick}
        >
            <Image
                alt={props.operatorClass}
                className="size-auto object-contain"
                height={32}
                priority
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/operator/classes/${props.operatorClass}.png`}
                width={32}
            />
        </div>
    );
}

export default ClassIcon;
