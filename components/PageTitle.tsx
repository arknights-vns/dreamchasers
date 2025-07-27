import TitleDecorLeft from "@/components/svg/TitleDecorLeft";
import TitleDecorRight from "@/components/svg/TitleDecorRight";

type PageTitleProps = {
    title: string;
    favorText?: string;
    light?: boolean;
};

export default function PageTitle(props: PageTitleProps) {
    const shouldWhite = props.light === true;
    const invertStyle = shouldWhite ? "" : "invert";
    const favorTextStyle = shouldWhite ? "text-black" : "text-white";

    return (
        <div className={"m-4"}>
            <div
                className={`mt-4 flex items-center justify-center ${invertStyle}`}
            >
                <div className={"hidden pr-4 md:block"}>
                    <TitleDecorLeft height={24} width={115} />
                </div>
                <div className={"text-center text-3xl font-extrabold md:text-4xl lg:text-5xl"}>
                    {props.title.toUpperCase()}
                </div>
                <div className={"hidden pl-4 md:block"}>
                    <TitleDecorRight height={24} width={115} />
                </div>
            </div>
            {props.favorText && (
                <p className={`mt-4 text-xl font-light ${favorTextStyle} text-center`}>{props.favorText}</p>
            )}
        </div>
    );
}
