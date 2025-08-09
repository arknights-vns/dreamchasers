"use client";

type ImageProps = {
    src: string;
    width: number;
    quality?: number;
};

// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
export default function supabaseLoader({ src, width, quality }: ImageProps) {
    const url = new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/render/image/public${src}`);
    url.searchParams.set("width", width.toString());
    url.searchParams.set("quality", (quality || 75).toString());
    return url.href;
}
