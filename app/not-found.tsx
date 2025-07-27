"use client";

import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";

export default function NotFoundPage() {
    const navigation = useRouter();

    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <div className={"text-center"}>
                <PageTitle favorText={"Có vẻ đây là đường cụt."} light title={"Well..."} />
            </div>

            <div className={"flex flex-1/2 flex-col items-center justify-center"}>
                <div className={"mx-4 text-center text-3xl font-bold text-white"}>
                    Không có gì ở đây hết á, hoặc là tụi mình đang trên đường nấu.
                </div>
                <div
                    className={"text-lg font-extralight text-white italic hover:underline"}
                    onClick={() => navigation.back()}
                >
                    (bấm vô đây để về trang trước)
                </div>
            </div>
        </div>
    );
}
