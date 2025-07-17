"use client";

import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";

export default function NotFoundPage() {
    const navigation = useRouter();

    return (
        <div className={"h-visible vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle title={"Well..."} favorText={"Có vẻ đây là đường cụt."} dark />
                </div>
            </div>
            <div
                className={"flex flex-1/2 flex-col items-center justify-center"}
                data-theme={"dark"}
            >
                <div className={"text-base-content text-3xl font-bold"}>
                    Không có gì ở đây hết á, hoặc là chúng tôi đang trên đường nấu.
                </div>
                <div
                    className={"text-base-content text-lg font-extralight italic hover:underline"}
                    onClick={() => navigation.back()}
                >
                    (bấm vô đây để về trang trước)
                </div>
            </div>
        </div>
    );
}
