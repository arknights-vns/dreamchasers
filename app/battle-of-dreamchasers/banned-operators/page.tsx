"use client";

import type { Terra } from "@/lib/supabase/terra";
import type { OperatorClass, OperatorRarity } from "@/lib/vns";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import OperatorIcon from "@/components/tournament/OperatorIcon";
import { useTimer } from "@/lib/hooks/useTimer";
import { supabase } from "@/lib/supabase/client";

type Operator = Terra["public"]["Tables"]["operators_v2"]["Row"];
type SelectedOperator = Pick<Operator, "name" | "rarity" | "profession" | "charid">;

function EmptySlot() {
    return (
        <div
            className={"relative aspect-[1/2] flex-1 flex flex-col justify-start"}
            style={{ background: "radial-gradient(circle, rgba(204,204,204,0) 60%, rgba(204,204,204,0.2) 100%)" }}
        >
        </div>
    );
}

export default function TournamentSlidePage() {
    const { isTimerLoaded, timerData, getDisplayTime, formatTime, isRealtimeConnected } = useTimer();
    const [bannedOperators, setBannedOperators] = useState<string[]>([]);
    const [operators, setOperators] = useState<SelectedOperator[]>([]);

    // prefetch everything
    useEffect(() => {
        (async () => {
            const { data: operators } = await supabase.from("operators_v2").select("name,charid,rarity,profession,archetype");
            if (operators) {
                setOperators(operators);
            }
        })();

        (async () => {
            const { data: banned_operators } = await supabase.from("banned_operators").select("id");
            if (banned_operators) {
                setBannedOperators(banned_operators.map(x => x.id).slice(5));
            }
        })();
    }, []);

    // update operator list
    useEffect(() => {
        const channel = supabase
            .channel("ban-update")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "banned_operators",
            }, (payload) => {
                console.info("New ban added:", payload.new.id);
                setBannedOperators(prev => [...prev, payload.new.id]);
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "banned_operators",
            }, (payload) => {
                setBannedOperators((prev) => {
                    console.info(`New ban updated: ${payload.old.id} to ${payload.new.id}`);
                    const filtered = prev.filter(id => id !== payload.old.id);
                    return [...filtered, payload.new.id];
                });
            })
            .on("postgres_changes", {
                event: "DELETE",
                schema: "public",
                table: "banned_operators",
            }, (payload) => {
                console.info("New ban nuked:", payload.old.id);
                setBannedOperators(prev => prev.filter(id => id !== payload.old.id));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel).then();
        };
    }, []);

    const bannedCount = bannedOperators.length;
    const unusedCount = 6 - bannedCount;

    return (
        <div className={"h-[calc(100vh)] vns-background flex flex-col"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle
                        title={"Banned Operators"}
                        dark
                    />
                </div>
            </div>
            <div
                className={"flex flex-1/2 flex-col justify-center items-center w-full pt-10 px-[10%]"}
                data-theme={"dark"}
            >
                <div className={"grid grid-cols-6 gap-20 w-full"}>
                    {operators
                        .filter(op => bannedOperators.includes(op.charid))

                        .map(operator => (
                            <OperatorIcon
                                key={operator.charid}
                                operator={{
                                    class: operator.profession as OperatorClass,
                                    id: operator.charid,
                                    rarity: operator.rarity as OperatorRarity,
                                    name: operator.name,
                                }}
                                isPortrait
                            />
                        ))}
                    {Array.from<number>({ length: unusedCount }).map((_, v) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <EmptySlot key={v} />
                    ))}
                </div>
                <div className={"flex self-center mt-15"}>
                    <div className={"text-xl text-white"}>
                        Thời gian còn lại:
                        {" "}
                        <span className={`font-extrabold ${
                            !isTimerLoaded
                                ? "text-red-400"
                                : timerData.state === "running"
                                    ? "text-green-400"
                                    : timerData.state === "paused"
                                        ? "text-yellow-400"
                                        : "text-red-400"
                        }`}
                        >
                            {!isTimerLoaded ? "--:--" : formatTime(getDisplayTime())}
                        </span>
                    </div>
                </div>
                <div className={"text-base-content font-extrabold"}>
                    Terra #1:
                    {" "}
                    <span className={`${isRealtimeConnected ? "text-green-300" : "text-red-300"}`}>
                        {isRealtimeConnected ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    );
}
