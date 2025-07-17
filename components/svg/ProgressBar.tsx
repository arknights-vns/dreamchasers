import type { FC } from "react";

const ProgressBar: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            width={"187"}
            height={"32"}
            viewBox={"0 0 187 32"}
            fill={"none"}
            xmlns={"http://www.w3.org/2000/svg"}
            className={className}
        >
            <rect
                x={"1"}
                y={"1"}
                width={"184.435"}
                height={"29.2729"}
                rx={"5"}
                stroke={"white"}
                strokeWidth={"2"}
            />
            <rect x={"5"} y={"4"} width={"101"} height={"24"} rx={"6"} fill={"white"} />
        </svg>
    );
};

export default ProgressBar;
