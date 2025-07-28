import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

type RetroItemProps = {
    title: string;
    description: string;
    imageSrc: StaticImageData | string;
    href: string;
};

export default function RetroItem(props: RetroItemProps) {
    return (
        <div className={"m-4 flex flex-col shadow-2xl/25 shadow-white lg:flex-row"}>
            <figure className={"flex max-h-48 max-w-full min-w-1/2 overflow-hidden"}>
                <Image alt={"retro_image"} className={"self-center"} src={props.imageSrc} />
            </figure>
            <div className={"flex min-w-1/2 flex-col items-center justify-center bg-white"}>
                <Link
                    className={"font-lg card-title m-2 text-center font-extrabold hover:underline"}
                    href={props.href}
                >
                    {props.title}
                </Link>
                <p className={"mx-auto my-3 text-center"}>{props.description}</p>
            </div>
        </div>
    );
}
