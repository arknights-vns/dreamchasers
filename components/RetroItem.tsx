import type { Route } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

type RetroItemProps = {
    title: string;
    description: string;
    imageSrc: StaticImageData | string;
    href: Route;
};

export default function RetroItem(props: RetroItemProps) {
    return (
        <div className={`
            flex max-w-[80vw] flex-col border-2 border-primary/25 shadow-lg/25
            shadow-primary
            lg:flex-row
        `}
        >
            <figure className={`
                flex max-h-48 w-full overflow-hidden
                lg:w-1/2
            `}
            >
                <Image alt={"retro_image"} className={"self-center"} src={props.imageSrc} />
            </figure>
            <div className={`
                flex w-full flex-col items-center justify-center
                lg:w-1/2
            `}
            >
                <Link
                    className={`
                        m-2 text-center text-xl font-extrabold
                        hover:underline
                    `}
                    href={props.href}
                >
                    {props.title}
                </Link>
                <p className={"m-3 text-center"}>{props.description}</p>
            </div>
        </div>
    );
}
