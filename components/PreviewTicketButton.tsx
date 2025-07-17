import Link from "next/link";

export default function PreviewTicketButton() {
    return (
        <Link
            href={"/tickets"}
            className={"btn btn-disabled btn-md lg:btn-lg hover:btn-outline rounded-2xl bg-black text-white hover:bg-white hover:text-black"}
        >
            <div className={"font-bold"}>Mua vé</div>
        </Link>
    );
}
