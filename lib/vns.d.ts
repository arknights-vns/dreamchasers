export type CrewMember = {
    name: string;
    quote: string;
    role: string[];
};

export type OperatorClass = "vanguard" | "guard" | "specialist" | "sniper" | "caster" | "medic" | "supporter" | "defender";
export type OperatorRarity = 1 | 2 | 3 | 4 | 5 | 6;

export type Operator = {
    id: string;
    name: string;
    rarity: OperatorRarity;
    class: OperatorClass;
};
