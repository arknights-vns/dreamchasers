"use client";

import type { Terra } from "@/lib/supabase/terra";
import type { OperatorClass, OperatorRarity } from "@/lib/vns";
import { clsx } from "clsx";
import Fuse from "fuse.js";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ClassIcon from "@/components/tournament/ClassIcon";
import OperatorIcon from "@/components/tournament/OperatorIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTimer } from "@/lib/hooks/use-timer";
import { createSupabase } from "@/lib/supabase/client";
import StarSelected from "@/public/tournament/drafting/star-selected.svg";
import StarUnSelected from "@/public/tournament/drafting/star-unselected.svg";

type Operator = Terra["public"]["Tables"]["operators_v2"]["Row"];
type SelectedOperator = Pick<Operator, "name" | "rarity" | "profession" | "charid">;
type OperatorClassSelection = "ALL" | OperatorClass;

export default function VotingPage() {
    const [operatorNameSearch, setOperatorNameSearch] = useState("");
    const [maxRarity, setMaxRarity] = useState(6);
    const [selectedClass, setSelectedClass] = useState<OperatorClassSelection>("ALL");
    const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
    const [bannedOperators, setBannedOperators] = useState<string[]>([]);
    const [isVotingAllowed, setIsVotingAllowed] = useState(false);
    const { isRealtimeConnected, isTimerLoaded, timerData, getDisplayTime, formatTime } = useTimer();
    const [operators, setOperators] = useState<SelectedOperator[]>([]);

    // #region operator selection
    const fuse = useMemo(() => {
        if (operators.length === 0) {
            return null;
        }

        return new Fuse(operators, {
            keys: ["name"],
            threshold: 0.5,
            includeScore: true,
            minMatchCharLength: 1
        });
    }, [operators]);

    const filteredOperators = useMemo(() => {
        let filtered = operators;

        if (operatorNameSearch && fuse) {
            const results = fuse.search(operatorNameSearch);
            filtered = results.map(result => result.item);
        }

        filtered = filtered.filter((op) => {
            const matchesRarity = op.rarity <= maxRarity;
            const matchesClass = selectedClass === "ALL" || (op.profession as OperatorClass) === selectedClass;
            return matchesRarity && matchesClass;
        });

        // desc rarity, asc name
        return filtered.sort((a, b) => {
            if (a.rarity !== b.rarity) {
                return b.rarity - a.rarity;
            }
            return a.name.localeCompare(b.name);
        });
    }, [operators, operatorNameSearch, maxRarity, selectedClass, fuse]);

    async function handleBanSubmission() {
        // I guess I watched too much Balatro University...
        console.info("Shipping it:", selectedOperators);

        const response = await fetch("/api/operator/ban", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: selectedOperators })
        });

        if (!response.ok) {
            toast.error("Đã có lỗi trong việc gửi BAN :<");
        } else {
            toast.success("Gửi BAN thành công :D");
            setSelectedOperators([]);
            setIsVotingAllowed(false);
        }
    }

    function handleOperatorSelection(charId: string) {
        if (bannedOperators.includes(charId)) {
            return;
        }

        setSelectedOperators((prev) => {
            if (prev.includes(charId)) {
                // already selected
                return prev.filter(id => id !== charId);
            } else if (prev.length < 6) {
                // not at capacity
                return [...prev, charId];
            }
            return prev; // we are full, bail tf out
        });
    }

    function removeSelectedOperator(charId: string) {
        setSelectedOperators(prev => prev.filter(id => id !== charId));
    }

    function handleClassSelection(classType: OperatorClassSelection) {
        // basically toggle the class selection
        if (selectedClass === classType) {
            setSelectedClass("ALL");
        } else {
            setSelectedClass(classType);
        }
    }
    // #endregion operator selection

    useEffect(() => {
        // get initial banned operators
        (async () => {
            try {
                const response = await fetch("/api/operator/ban");

                if (!response.ok) {
                    throw new Error("Failed to fetch banned operators");
                }

                const data = await response.json();
                const bannedIds = data.map((item: { id: string }) => item.id);
                setBannedOperators(bannedIds);
            } catch {
                toast.error("Có lỗi xảy ra, bạn thử load lại nhé!");
            }
        })();

        const supabase = createSupabase();

        (async () => {
            const { data: operators } = await supabase
                .from("operators_v2")
                .select("name,charid,rarity,profession");

            setOperators(operators!);
        })();

        const channel = supabase
            .channel("ban-update")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "banned_operators"
            }, (payload) => {
                console.info("New ban added:", payload.new.id);
                setBannedOperators(prev => [...prev, payload.new.id]);
                toast.error("Đã có operator bị ban!");
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
                toast.warning("Đã có thay đổi operator bị ban!");
            })
            .on("postgres_changes", {
                event: "DELETE",
                schema: "public",
                table: "banned_operators"
            }, (payload) => {
                console.info("New ban nuked:", payload.old.id);
                setBannedOperators(prev => prev.filter(id => id !== payload.old.id));
                toast.warning("Đã có operator bị gỡ ban!");
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel).then();
        };
    }, []);

    useEffect(() => {
        switch (timerData.state) {
            case "paused":
                toast.error("Vote đã bị tạm ngưng.");
                // fall through
            case "stopped":
                // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
                setIsVotingAllowed(false);
                break;
            case "running":
                toast.success("Vote đã bật!");
                // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
                setIsVotingAllowed(true);
                break;
        }
    }, [timerData.state]);

    return (
        <div className="mx-2 scrollbar-none flex h-visible flex-col bg-vns">
            <div className="flex h-[calc(100vh_-_80px)] flex-col items-center justify-evenly space-y-2 py-4">
                {/* Server status */}
                <div className="font-bold">
                    PRTS:
                    {" "}
                    <span className={clsx({
                        "text-green-500": isRealtimeConnected,
                        "text-red-400": !isRealtimeConnected
                    })}
                    >
                        {isRealtimeConnected ? "Online" : "Offline"}
                    </span>
                </div>
                {/* Time */}
                <div className="font-bold">
                    Thời gian còn lại:
                    {" "}
                    <span className={clsx(
                        "font-extrabold",
                        isTimerLoaded && {
                            "text-green-400": timerData.state === "running",
                            "text-yellow-400": timerData.state === "paused",
                            "text-muted-foreground": timerData.state === "stopped"
                        }
                    )}
                    >
                        {!isTimerLoaded ? "--:--" : formatTime(getDisplayTime())}
                    </span>
                </div>
                {/* Input */}
                <div className="flex w-[80vw] justify-evenly">
                    <Input className="w-2/3" placeholder="Ghi tên op ở đây..." value={operatorNameSearch} onChange={e => setOperatorNameSearch(e.target.value)} />
                    <Button
                        className="ml-2 w-1/3"
                        onClick={() => setOperatorNameSearch("")}
                    >
                        Clear
                    </Button>
                </div>
                {/* Star rating */}
                <div className="flex items-center justify-center space-x-1">
                    <Image alt="Star 1" priority height={32} src={maxRarity >= 1 ? StarSelected : StarUnSelected} onClick={() => setMaxRarity(1)} />
                    <Image alt="Star 2" priority height={32} src={maxRarity >= 2 ? StarSelected : StarUnSelected} onClick={() => setMaxRarity(2)} />
                    <Image alt="Star 3" priority height={32} src={maxRarity >= 3 ? StarSelected : StarUnSelected} onClick={() => setMaxRarity(3)} />
                    <Image alt="Star 4" priority height={32} src={maxRarity >= 4 ? StarSelected : StarUnSelected} onClick={() => setMaxRarity(4)} />
                    <Image alt="Star 5" priority height={32} src={maxRarity >= 5 ? StarSelected : StarUnSelected} onClick={() => setMaxRarity(5)} />
                    <Image alt="Star 6" priority height={32} src={maxRarity >= 6 ? StarSelected : StarUnSelected} onClick={() => setMaxRarity(6)} />
                </div>
                {/* Class */}
                <div className="mx-auto flex items-center justify-center">
                    <div className="pr-4 font-bold">Class</div>
                    <ClassIcon active={selectedClass === "Caster"} operatorClass="Caster" onClick={() => handleClassSelection("Caster")} />
                    <ClassIcon active={selectedClass === "Medic"} operatorClass="Medic" onClick={() => handleClassSelection("Medic")} />
                    <ClassIcon active={selectedClass === "Guard"} operatorClass="Guard" onClick={() => handleClassSelection("Guard")} />
                    <ClassIcon active={selectedClass === "Sniper"} operatorClass="Sniper" onClick={() => handleClassSelection("Sniper")} />
                    <ClassIcon active={selectedClass === "Specialist"} operatorClass="Specialist" onClick={() => handleClassSelection("Specialist")} />
                    <ClassIcon active={selectedClass === "Supporter"} operatorClass="Supporter" onClick={() => handleClassSelection("Supporter")} />
                    <ClassIcon active={selectedClass === "Defender"} operatorClass="Defender" onClick={() => handleClassSelection("Defender")} />
                    <ClassIcon active={selectedClass === "Vanguard"} operatorClass="Vanguard" onClick={() => handleClassSelection("Vanguard")} />
                </div>
                {/* List */}
                {
                    operators.length > 0
                        ? (
                                <div className="scrollbar-none grid h-[727px] w-[90vw] grid-cols-5 gap-6 overflow-y-auto rounded-lg border bg-background p-6 md:grid-cols-9">
                                    {filteredOperators.map(operator => (
                                        <OperatorIcon
                                            key={operator.charid}
                                            isBanned={(operator.profession as OperatorClass) === "Specialist" || bannedOperators.includes(operator.charid)}
                                            isSelected={selectedOperators.includes(operator.charid)}
                                            operator={{
                                                id: operator.charid,
                                                name: operator.name,
                                                rarity: operator.rarity as OperatorRarity,
                                                class: operator.profession as OperatorClass
                                            }}
                                            onClickFn={() => handleOperatorSelection(operator.charid)}
                                        />
                                    ))}
                                </div>
                            )
                        : (
                                <Skeleton className="h-full w-[80vw] rounded-lg border" />
                            )
                }
                {/* Selection */}
                <div className="w-full">
                    <div className="mb-2 text-center font-extrabold">
                        Hãy chọn Operator bạn muốn cấm (
                        {selectedOperators.length}
                        /6)
                    </div>
                    <div className="grid grid-cols-6 gap-7">
                        {Array.from({ length: 6 }, (_, index) => {
                            const selectedCharId = selectedOperators[index];
                            const selectedOp = selectedCharId
                                ? operators.find(op => op.charid === selectedCharId)
                                : null;
                            return (
                                <div key={index} className="h-28">
                                    {
                                        selectedOp
                                            ? (
                                                    <OperatorIcon
                                                        isSelected={false}
                                                        operator={{
                                                            id: selectedOp.charid,
                                                            name: selectedOp.name,
                                                            rarity: selectedOp.rarity as OperatorRarity,
                                                            class: selectedOp.profession as OperatorClass
                                                        }}
                                                        onClickFn={() => removeSelectedOperator(selectedCharId)}
                                                    />
                                                )
                                            : (
                                                    <div className="mt-6 text-center text-xs text-muted-foreground">
                                                        Empty
                                                    </div>
                                                )
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* CTA */}
                <div className="flex w-[90vw] justify-evenly">
                    <Button
                        className="w-1/3 bg-green-600 text-white"
                        disabled={selectedOperators.length === 0}
                        onClick={() => setSelectedOperators([])}
                    >
                        CLEAR
                    </Button>
                    <Button
                        className="w-1/3 bg-red-600 text-white"
                        disabled={selectedOperators.length === 0 || !isVotingAllowed || getDisplayTime() <= 0}
                        onClick={async () => {
                            await handleBanSubmission();
                        }}
                    >
                        BAN
                    </Button>
                </div>
            </div>
        </div>
    );
}
