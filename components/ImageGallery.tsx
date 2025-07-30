"use client";

import Image from "next/image";

type ImageGalleryProps = {
    albumPath: string;
    imageCount: number;
    extension?: string;
    className?: string;
};

export default function ImageGallery({
    albumPath,
    imageCount,
    extension = "jpg"
}: ImageGalleryProps) {
    const images = Array.from(
        { length: imageCount },
        (_, i) => `${albumPath}/${i + 1}.${extension}`
    );

    return (
        <div
            className={"max-w-screen"}
        >
            <div
                className={`
                    max-w-full
                    [column-gap:1.12rem]
                    [column-count:2]
                    md:[column-count:3]
                    lg:[column-count:4]
                `}
            >
                {images.map(src => (
                    <div
                        key={src}
                        className={`
                            mb-[1.12rem] w-full break-inside-avoid
                            overflow-hidden rounded-xl shadow-lg
                        `}
                    >
                        <Image
                            alt={""}
                            className={"block object-cover"}
                            height={480}
                            priority
                            src={src}
                            width={854}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
