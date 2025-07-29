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
        <div className={"mx-4 flex flex-col border border-primary/25 shadow-md/25 shadow-primary lg:flex-row"}>
            <figure className={"flex max-h-48 w-full overflow-hidden lg:w-1/2"}>
                <Image alt={"retro_image"} className={"self-center"} src={props.imageSrc} />
            </figure>
            <div className={"flex w-full flex-col items-center justify-center bg-secondary lg:w-1/2"}>
                <Link
                    className={"font-lg card-title m-2 text-center font-extrabold hover:underline"}
                    href={props.href}
                >
                    {props.title}
                </Link>
                <p className={"m-3 text-center"}>{props.description}</p>
            </div>
        </div>
    );
}
