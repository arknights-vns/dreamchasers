import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Amiyi from "@/public/tournament/prizes/AmiyiRazer.png";
import Artbook from "@/public/tournament/prizes/Artbook.png";
import Ines from "@/public/tournament/prizes/Ines.png";

export default function PrizePage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle title="Giải thưởng" />
            <div className="mb-8 flex flex-col">
                <div className="text-center text-xl font-light italic">
                    Với các bạn TOP 3, ngoài việc nhận thêm giấy khen từ BTC:
                </div>
                <div className="flex w-screen flex-col items-center justify-center md:flex-row">
                    {/* 3rd */}
                    <Card className="border-none bg-transparent shadow-none md:w-1/3">
                        <CardHeader className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-center text-4xl font-extrabold text-amber-700">
                                Giải Ba
                            </div>
                        </CardHeader>
                        <CardContent className="flex h-72 justify-center">
                            <Image
                                alt="map-info"
                                className="object-contain"
                                src={Artbook}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-between space-y-2">
                            Arknights Artbook VOL 1, 4, 5
                        </CardFooter>
                    </Card>
                    {/* 2nd */}
                    <Card className="border-none bg-transparent shadow-none md:w-1/3">
                        <CardHeader className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-center text-4xl font-extrabold text-gray-500">
                                Giải Nhì
                            </div>
                        </CardHeader>
                        <CardContent className="flex h-72 justify-center">
                            <Image
                                alt="map-info"
                                className="object-contain"
                                src={Amiyi}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-between space-y-2">
                            Razer X Arknights - Chuột không dây - Amiya theme
                        </CardFooter>
                    </Card>
                    {/* 1st */}
                    <Card className="border-none bg-transparent shadow-none md:w-1/3">
                        <CardHeader className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-center text-4xl font-extrabold text-amber-300">
                                Giải Nhất
                            </div>
                        </CardHeader>
                        <CardContent className="flex h-72 justify-center">
                            <Image
                                alt="map-info"
                                className="object-contain"
                                height={200}
                                src={Ines}
                                width={200}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-between space-y-2">
                            Figure Ines SIÊU MÚP RỤP.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
