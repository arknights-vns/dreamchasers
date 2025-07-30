"use client";

import type { Terra } from "@/lib/supabase/terra";
import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useTimer } from "@/lib/hooks/useTimer";
import { supabase } from "@/lib/supabase/client";
import StarSelected from "@/public/tournament/drafting/star-selected.svg";
import StarUnSelected from "@/public/tournament/drafting/star-unselected.svg";

type Operator = Terra["public"]["Tables"]["operators_v2"]["Row"];
type SelectedOperator = Pick<Operator, "name" | "rarity" | "profession" | "charid">;

export default function TournamentSlidePage() {
    const { isTimerLoaded, timerData, getDisplayTime, formatTime, isRealtimeConnected } = useTimer();
    const [bannedOperators, setBannedOperators] = useState<string[]>([]);
    const [operators, setOperators] = useState<SelectedOperator[]>([]);

    // prefetch everything
    useEffect(() => {
        (async () => {
            const { data: operators } = await supabase.from("operators_v2").select("name,charid,rarity,profession");
            if (operators) {
                setOperators(operators);
            }
        })();

        (async () => {
            const { data: banned_operators } = await supabase.from("banned_operators").select("id").order("since");
            if (banned_operators) {
                console.info(banned_operators);
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
                table: "banned_operators"
            }, (payload) => {
                console.info("New ban added:", payload.new.id);
                setBannedOperators(prev => [...prev, payload.new.id]);
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "banned_operators"
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
                table: "banned_operators"
            }, (payload) => {
                console.info("New ban nuked:", payload.old.id);
                setBannedOperators(prev => prev.filter(id => id !== payload.old.id));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel).then();
        };
    }, []);

    return (
        <div className={"flex h-visible flex-col bg-vns"}>
            {/* <PageTitle title={"Banned Operators"} /> */}
            <div
                className={`flex flex-1/2 flex-col items-center justify-evenly`}
            >
                <div className={"text-xl text-white"}>
                    <span className={clsx(
                        "text-6xl font-extrabold text-muted-foreground",
                        isTimerLoaded && {
                            "text-green-400": timerData.state === "running",
                            "text-yellow-400": timerData.state === "paused",
                            "text-red-400": timerData.state === "stopped"
                        }
                    )}
                    >
                        {!isTimerLoaded ? "--:--" : formatTime(getDisplayTime())}
                    </span>
                </div>
                <div className={"flex w-full justify-evenly"}>
                    {
                        [0, 1, 2, 3, 4, 5].map((i) => {
                            const charcode = bannedOperators.at(i) ?? "Max Verstappen";
                            const operator = operators.find(x => x.charid === charcode);
                            const name = operator?.name ?? "???";
                            const rarity = operator?.rarity ?? 0;
                            const suffix = rarity <= 3 ? 1 : 2;

                            return (
                                <Card
                                    key={i}
                                    className={clsx(`
                                        h-115 w-57 rounded-none border-none
                                        to-background to-95%
                                    `, {
                                        "bg-gradient-to-t from-orange-400/75": rarity === 6,
                                        "bg-gradient-to-t from-amber-400/75": rarity === 5,
                                        "bg-gradient-to-t from-purple-500/75": rarity === 4,
                                        "bg-gradient-to-t from-cyan-500/75": rarity === 3,
                                        "bg-gradient-to-t from-green-400/75": rarity === 2,
                                        "bg-gradient-to-t from-neutral-400/75": rarity === 1
                                    })}
                                >
                                    <CardHeader className={`
                                        text-center text-xl font-bold
                                    `}
                                    >
                                        Operator #
                                        {i + 1}
                                    </CardHeader>
                                    <CardContent className={`
                                        h-[360px] w-[180px] self-center
                                    `}
                                    >
                                        <Image
                                            alt={charcode}
                                            height={360}
                                            src={`/operator/portraits/${charcode}_${suffix}.png`}
                                            width={180}
                                        />
                                    </CardContent>
                                    <CardFooter className={`
                                        flex h-24 flex-col justify-center
                                        text-xl
                                    `}
                                    >
                                        <div className={`
                                            flex items-center justify-center
                                            space-x-1
                                        `}
                                        >
                                            {
                                                [1, 2, 3, 4, 5, 6].map((x) => {
                                                    return (
                                                        x <= rarity
                                                            ? <Image key={x} alt={"star"} height={16} src={StarSelected} width={16} />
                                                            : <Image key={x} alt={"star"} height={16} src={StarUnSelected} width={16} />
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className={"text-center font-bold"}>
                                            {/* {"Vai con cai ten nao dai hon khong chat"} */}
                                            {name}
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    }
                </div>
                <div className={"pb-8 font-extrabold text-primary"}>
                    Terra #1:
                    {" "}
                    <span className={clsx({
                        "text-green-500": isRealtimeConnected,
                        "text-red-500": !isRealtimeConnected
                    })}
                    >
                        {isRealtimeConnected ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    );
}
