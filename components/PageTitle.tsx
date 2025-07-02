import TitleDecorLeft from "@/components/svg/TitleDecorLeft";
import TitleDecorRight from "@/components/svg/TitleDecorRight";

type PageTitleProps = {
    title: string;
    favorText?: string;
    dark?: boolean;
};

export default function PageTitle(props: PageTitleProps) {
    const isDarkBg = props.dark === true;
    const invertStyle = isDarkBg ? "invert" : "";
    const favorTextStyle = isDarkBg ? "text-white" : "text-black";

    return (
        <div className={"w-full"}>
            <div
                className={`mt-4 flex items-center justify-center text-center ${invertStyle} relative mx-auto w-fit`}
            >
                <div className={"pr-4"}>
                    <TitleDecorLeft width={115} height={24} />
                </div>
                <h1 className={"text-center text-lg font-extrabold md:text-2xl lg:text-5xl"}>
                    {props.title}
                </h1>
                <div className={"pl-4"}>
                    <TitleDecorRight width={115} height={24} />
                </div>
            </div>
            {props.favorText && <p className={`mt-4 ${favorTextStyle}`}>{props.favorText}</p>}
        </div>
    );
}
