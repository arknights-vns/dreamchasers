import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle favorText="Có vẻ đây là đường cụt." title="Well..." />

            <div className="flex flex-1/2 flex-col items-center justify-center">
                <div className="m-4 text-center text-3xl font-bold">
                    Không có gì ở đây hết á, hoặc là tụi mình đang trên đường nấu.
                </div>
                <Button
                    asChild
                    className="cursor-pointer text-lg font-extralight"
                >
                    <Link href="/">Bấm vô đây để về trang chính</Link>
                </Button>
            </div>
        </div>
    );
}
