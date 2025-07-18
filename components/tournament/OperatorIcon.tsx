import type { Operator } from "@/lib/vns";
import Image from "next/image";
import Arene from "@/public/tournament/drafting/Arene.png";

function getRarityColor(rarity: number) {
    switch (rarity) {
        case 1:
            return "#A0A0A0";
        case 2:
            return "#DCDC00";
        case 3:
            return "#00AAEE";
        case 4:
            return "#D6C5D6";
        case 5:
            return "#FFFFA9";
        case 6:
            return "#FFC800";
        default:
            console.error("Invalid rarity:", rarity);
    }
}

type OperatorIconProps = {
    operator: Operator;
    isSelected?: boolean;
    isBanned?: boolean;
    isPortrait?: boolean;
    onClickFn?: () => void;
};

function OperatorIcon(props: OperatorIconProps) {
    const rarityColor = getRarityColor(props.operator.rarity);
    // everchanging, the knowing feelings,
    // could make you fall from the dreamy skies
    const selectedColor = "#77DD77";

    const imageSource = props.isPortrait
        ? `/operator/portraits/${props.operator.id}_2.png`
        : (props.operator.name === "Arene"
                ? Arene
                : `/operator/icons/${props.operator.id}.png`);

    const width = props.isPortrait ? "" : "w-16";

    return (
        <div
            className={`flex ${width} flex-col items-center ${props.isBanned ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={props.isBanned ? undefined : props.onClickFn}
        >
            <div
                className={`flex p-1 items-center justify-center ${props.isBanned ? "grayscale" : ""}`}
                style={{
                    background: `linear-gradient(
                        to top,
                        ${props.isSelected ? selectedColor : rarityColor} 0%,
                        ${props.isSelected ? selectedColor : rarityColor}70 50%,
                        ${props.isSelected ? selectedColor : rarityColor}00 100%
                    )`,
                    borderBottom: `4px solid ${props.isSelected ? selectedColor : rarityColor}`,
                }}
            >
                <Image
                    src={
                        imageSource
                    }
                    width={128}
                    height={props.isPortrait ? 256 : 48}
                    alt={props.operator.name}
                    className={"object-cover"}
                />
            </div>
            <div className={"flex flex-col space-x-0 mt-4 justify-center items-center"}>
                {props.isPortrait && (
                    <Image
                        src={`/operator/classes/${props.operator.class}.png`}
                        width={48}
                        height={48}
                        alt={"class"}
                        className={"object-none"}
                    />
                )}
                <div className={`text-center ${props.isPortrait ? "text-xl font-extrabold" : "text-xs font-light"} ${props.isBanned ? "text-gray-500" : "text-base-content"}`}>{props.operator.name}</div>
            </div>
        </div>
    );
}

export default OperatorIcon;
