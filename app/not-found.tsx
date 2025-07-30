"use client";

import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    const navigation = useRouter();

    return (
        <div className={"flex h-visible flex-col bg-vns"}>
            <PageTitle favorText={"Có vẻ đây là đường cụt."} title={"Well..."} />

            <div className={"flex flex-1/2 flex-col items-center justify-center"}>
                <div className={"m-4 text-center text-3xl font-bold"}>
                    Không có gì ở đây hết á, hoặc là tụi mình đang trên đường nấu.
                </div>
                <Button
                    className={"cursor-pointer text-lg font-extralight"}
                    onClick={() => navigation.back()}
                >
                    Bấm vô đây để về trang trước
                </Button>
            </div>
        </div>
    );
}
