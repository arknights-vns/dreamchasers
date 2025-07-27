import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function PreviewTicketButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"rounded-xl bg-black font-bold text-white"} size={"lg"}>
                    Mua vé
                </Button>
            </DialogTrigger>
            <DialogContent className={"space-y-1"}>
                <DialogHeader>
                    <DialogTitle className={"text-center text-xl font-bold"}>
                        Xin lỗi bạn nha, tụi mình soldout rồi...
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <div>
                        <p>
                            Bạn nhớ theo dõi thông tin mới nhất tại page
                            {" "}
                            <Link
                                className={"font-extrabold underline"}
                                href={"https://www.facebook.com/terrastationvn"}
                                rel={"noopener noreferrer"}
                                target={"_blank"}
                            >
                                Trạm dừng chân chốn Terra nhé.
                            </Link>
                        </p>
                        <p>Tụi mình mong được gặp bạn tại Offline!</p>
                        <p className={"py-4 text-center italic"}>(bấm ra bên ngoài để đóng)</p>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
