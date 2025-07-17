"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Terra } from "@/lib/supabase/terra";
import type { OperatorClass } from "@/lib/vns";
import Fuse from "fuse.js";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ClassIcon from "@/components/tournament/ClassIcon";
import OperatorIcon from "@/components/tournament/OperatorIcon";
import { supabase } from "@/lib/supabase/client";
import StarSelected from "@/public/tournament/drafting/star-selected.svg";
import StarUnSelected from "@/public/tournament/drafting/star-unselected.svg";

type TimerState = "stopped" | "running" | "paused";

type TimerData = {
    state: TimerState;
    remaining_time: number;
    started_at: number | null;
    paused_at: number | null;
    updated_at: number;
    calculated_remaining_time?: number;
};

type Operator = Terra["public"]["Tables"]["operators_v2"]["Row"];
type SelectedOperator = Pick<Operator, "name" | "rarity" | "archetype" | "profession" | "charid">;

export default function DraftingPage() {
    const [operatorNameSearch, setOperatorNameSearch] = useState("");
    const [selectedRarity, setSelectedRarity] = useState(6);
    const [selectedClass, setSelectedClass] = useState<OperatorClass>("ALL");
    const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
    const [bannedOperators, setBannedOperators] = useState<string[]>([]);
    const [operators, setOperators] = useState<SelectedOperator[]>([]);
    const [isSbConnected, setIsSbConnected] = useState(false);
    const [timerData, setTimerData] = useState<TimerData>({
        state: "stopped",
        remaining_time: 60,
        started_at: null,
        paused_at: null,
        updated_at: Date.now(),
    });
    const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
    const [isTimerLoaded, setIsTimerLoaded] = useState(false);

    const timerChannelRef = useRef<RealtimeChannel | null>(null);

    // #region operator selection
    const fuse = useMemo(() => {
        if (operators.length === 0)
            return null;

        return new Fuse(operators, {
            keys: ["name"],
            threshold: 0.5,
            includeScore: true,
            minMatchCharLength: 1,
        });
    }, [operators]);

    const filteredOperators = useMemo(() => {
        let filtered = operators;

        if (operatorNameSearch && fuse) {
            const results = fuse.search(operatorNameSearch);
            filtered = results.map(result => result.item);
        }

        filtered = filtered.filter((op) => {
            const matchesRarity = op.rarity <= selectedRarity;
            const matchesClass = selectedClass === "ALL" || op.profession.toLowerCase() === selectedClass;
            return matchesRarity && matchesClass;
        });

        // desc rarity, asc name
        return filtered.sort((a, b) => {
            if (a.rarity !== b.rarity) {
                return b.rarity - a.rarity;
            }
            return a.name.localeCompare(b.name);
        });
    }, [operators, operatorNameSearch, selectedRarity, selectedClass, fuse]);

    async function handleBanSubmission() {
        // I guess I watched too much Balatro University...
        console.info("Shipping it:", selectedOperators);

        const { error } = await supabase.from("member_vote").insert(
            selectedOperators.map(charId => ({
                id: charId,
                since: new Date().toISOString(),
            })),
        );

        if (error) {
            console.error("Failed to submit ban:", error);
        }

        // just fail silently or else there will a chaos at the event.
        setSelectedOperators([]);
    }

    function handleOperatorSelection(charId: string) {
        // Prevent selection if operator is banned
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

    function handleClassSelection(classType: OperatorClass) {
        // basically toggle the class selection
        if (selectedClass === classType) {
            setSelectedClass("ALL");
        } else {
            setSelectedClass(classType);
        }
    }
    // #endregion operator selection

    // #region Eye of Priestess
    // check if Eye of Priestess is connectable
    useEffect(() => {
        (async function () {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

            const response = await fetch(`${supabaseUrl}/rest/v1/`, {
                method: "HEAD",
                headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`,
                },
            });

            setIsSbConnected(response.ok);
        })();
    }, []);

    // get initial banned operators from Eye of Priestess.
    // more escape hatches I guess.
    useEffect(() => {
        if (!isSbConnected)
            return;

        (async function () {
            const { data } = await supabase
                .from("banned_operators")
                .select("id");

            if (data) {
                const bannedIds = data.map(item => item.id);
                setBannedOperators(bannedIds);
            }
        })();
    }, [isSbConnected]);

    // handle ban updates from Eye of Priestess.
    useEffect(() => {
        if (!isSbConnected)
            return;

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
    }, [isSbConnected]);

    // evict votes on new ban addition.
    useEffect(() => {
        if (bannedOperators.length === 0 || !isSbConnected)
            return;

        (async function () {
            // backup
            const { data } = await supabase.from("member_vote").select("id,since");
            if (data != null)
                await supabase.from("old_member_vote").insert(data);

            // delete
            await supabase.from("member_vote").delete().neq("vote_number", 0);
        })();
    }, [bannedOperators, isSbConnected]);

    // fetch the operators
    // it's just ~350 operators, so I guess supabase can handle that.
    useEffect(() => {
        if (!isSbConnected)
            return;

        (async function () {
            const { data: operators } = await supabase.from("operators_v2").select("name,charid,rarity,profession,archetype");
            if (operators) {
                setOperators(operators);
            }
        })();
    }, [isSbConnected]);
    // #endregion Eye of Priestess

    // #region Truckload of hell synchronization issues
    useEffect(() => {
        const initialFetch = async () => {
            try {
                const response = await fetch("/api/timer/status");
                const result = await response.json();

                if (response.ok && result.timer) {
                    const timerFromAPI = {
                        state: result.timer.state,
                        remaining_time: result.timer.remaining_time,
                        started_at: result.timer.started_at ? new Date(result.timer.started_at).getTime() : null,
                        paused_at: result.timer.paused_at ? new Date(result.timer.paused_at).getTime() : null,
                        updated_at: new Date(result.timer.updated_at).getTime(),
                        calculated_remaining_time: result.timer.calculated_remaining_time,
                    };

                    setTimerData(timerFromAPI);
                    setIsTimerLoaded(true);
                }
            } catch (error) {
                console.error("Failed to fetch initial timer status:", error);
            }
        };

        initialFetch();

        const channel = supabase.channel("timer-state-changes-drafting")
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "timer_state",
                filter: "id=eq.main_timer",
            }, (payload) => {
                console.info("Drafting page received timer state change:", payload);
                if (payload.new && typeof payload.new === "object") {
                    const newTimer = payload.new as any;

                    const remainingTime = Number(newTimer.remaining_time);
                    if (!Number.isFinite(remainingTime) || remainingTime < 0) {
                        console.warn("Invalid remaining_time received:", newTimer.remaining_time);
                        return;
                    }

                    let calculatedRemainingTime = remainingTime;
                    if (newTimer.state === "running" && newTimer.started_at) {
                        const startTime = new Date(newTimer.started_at).getTime();
                        if (Number.isFinite(startTime)) {
                            const elapsed = Math.floor((Date.now() - startTime) / 1000);
                            calculatedRemainingTime = Math.max(0, remainingTime - elapsed);
                        }
                    }

                    if (!Number.isFinite(calculatedRemainingTime)) {
                        console.warn("Invalid calculated remaining time:", calculatedRemainingTime);
                        calculatedRemainingTime = remainingTime;
                    }

                    const updatedTimerData = {
                        state: newTimer.state || "stopped",
                        remaining_time: remainingTime,
                        started_at: newTimer.started_at ? new Date(newTimer.started_at).getTime() : null,
                        paused_at: newTimer.paused_at ? new Date(newTimer.paused_at).getTime() : null,
                        updated_at: new Date(newTimer.updated_at).getTime(),
                        calculated_remaining_time: calculatedRemainingTime,
                    };

                    setTimerData(updatedTimerData);
                    setIsTimerLoaded(true);
                }
            })
            .subscribe((status) => {
                setIsRealtimeConnected(status === "SUBSCRIBED");
            });

        timerChannelRef.current = channel;

        return () => {
            supabase.removeChannel(channel);
            setIsRealtimeConnected(false);
        };
    }, [isSbConnected]);

    // timer update loop.
    useEffect(() => {
        if (timerData.state !== "running")
            return;

        const interval = setInterval(() => {
            setTimerData((prev) => {
                if (prev.state !== "running" || !prev.started_at)
                    return prev;

                const elapsed = Math.floor((Date.now() - prev.started_at) / 1000);
                const newRemainingTime = Math.max(0, prev.remaining_time - elapsed);

                // don't know why NaN:NaN occurs, but
                // this is insane fr fr no cap
                if (!Number.isFinite(newRemainingTime)) {
                    console.warn("Invalid remaining time calculated:", newRemainingTime);
                    return prev;
                }

                return {
                    ...prev,
                    calculated_remaining_time: newRemainingTime,
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerData.state, timerData.started_at, timerData.remaining_time]);
    // #endregion Real-time timer synchronization

    // #region data backup, must be last hook because React effects are LIFO
    useEffect(() => {
        const savedSearch = localStorage.getItem("drafting-search");
        const savedRarity = localStorage.getItem("drafting-rarity");
        const savedClass = localStorage.getItem("drafting-class");
        const savedOperators = localStorage.getItem("drafting-selected-operators");

        if (savedSearch) {
            setOperatorNameSearch(savedSearch);
        }
        if (savedRarity) {
            setSelectedRarity(Number.parseInt(savedRarity, 10));
        }
        if (savedClass) {
            setSelectedClass(savedClass as OperatorClass);
        }
        if (savedOperators) {
            try {
                const parsed = JSON.parse(savedOperators) as string[];
                setSelectedOperators(parsed);
            } catch (error) {
                console.warn("Failed to parse saved operators:", error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("drafting-search", operatorNameSearch);
    }, [operatorNameSearch]);

    useEffect(() => {
        localStorage.setItem("drafting-rarity", selectedRarity.toString());
    }, [selectedRarity]);

    useEffect(() => {
        localStorage.setItem("drafting-class", selectedClass);
    }, [selectedClass]);

    useEffect(() => {
        localStorage.setItem("drafting-selected-operators", JSON.stringify(selectedOperators));
    }, [selectedOperators]);
    // #endregion data backup

    function formatTime(seconds: number) {
        const totalSec = Math.max(0, Math.floor(seconds));
        const minutes = Math.floor(totalSec / 60);
        const remainingSeconds = totalSec % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    function getDisplayTime(): number {
        // Always prioritize calculated_remaining_time when available
        if (timerData.calculated_remaining_time !== undefined && Number.isFinite(timerData.calculated_remaining_time)) {
            return timerData.calculated_remaining_time;
        }
        // Fallback to the base remaining_time from timerData
        return timerData.remaining_time;
    }

    return (
        <div className={"h-visible vns-background flex flex-col relative"}>
            <div className={"hero"}>
                <div className={"hero-content text-center"}>
                    <PageTitle title={"Ban pick"} favorText={""} dark />
                </div>
            </div>
            <div
                className={"flex flex-col items-center justify-center gap-y-4 text-base-content mb-4"}
                data-theme={"dark"}
            >
                <div className={`flex text-sm font-bold`}>
                    <div className={`${isSbConnected ? "text-green-300" : "text-red-300"}`}>
                        Terra #0:
                        {" "}
                        {isSbConnected ? "Online" : "Offline"}
                    </div>
                    <div className={"mx-2"}>|</div>
                    <div className={`${isRealtimeConnected ? "text-green-300" : "text-red-300"}`}>
                        Terra #1:
                        {" "}
                        {isRealtimeConnected ? "Online" : "Offline"}
                    </div>
                </div>
                <div className={"hidden lg:block text-base-content text-3xl font-bold"}>
                    Bạn cần sử dụng điện thoại cho phần này.
                </div>

                {/* the actual shit. */}
                <div className={`lg:hidden flex flex-col items-center justify-center gap-y-4`}>
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
                    <div className={"flex items-center justify-center gap-x-2"}>
                        <input className={"border-1 border-white px-5"} value={operatorNameSearch} onChange={e => setOperatorNameSearch(e.target.value)} placeholder={"Ghi tên op ở đây..."} />
                        <button
                            className={"border-1 border-white mx-2 px-4 bg-[#2e76a9] disabled:bg-gray-600 disabled:opacity-50"}
                            type={"button"}
                            disabled={operatorNameSearch === ""}
                            onClick={() => setOperatorNameSearch("")}
                        >
                            Clear
                        </button>
                    </div>
                    <div className={"flex items-center justify-center gap-x-2"}>
                        <Image src={selectedRarity >= 1 ? StarSelected : StarUnSelected} alt={"Star 1"} height={32} onClick={() => setSelectedRarity(1)} />
                        <Image src={selectedRarity >= 2 ? StarSelected : StarUnSelected} alt={"Star 2"} height={32} onClick={() => setSelectedRarity(2)} />
                        <Image src={selectedRarity >= 3 ? StarSelected : StarUnSelected} alt={"Star 3"} height={32} onClick={() => setSelectedRarity(3)} />
                        <Image src={selectedRarity >= 4 ? StarSelected : StarUnSelected} alt={"Star 4"} height={32} onClick={() => setSelectedRarity(4)} />
                        <Image src={selectedRarity >= 5 ? StarSelected : StarUnSelected} alt={"Star 5"} height={32} onClick={() => setSelectedRarity(5)} />
                        <Image src={selectedRarity >= 6 ? StarSelected : StarUnSelected} alt={"Star 6"} height={32} onClick={() => setSelectedRarity(6)} />
                    </div>
                    <div className={"flex items-center justify-center px-2"}>
                        <div className={"mr-5"}>Class</div>
                        <ClassIcon operatorClass={"caster"} active={selectedClass === "caster"} onClick={() => handleClassSelection("caster")} />
                        <ClassIcon operatorClass={"medic"} active={selectedClass === "medic"} onClick={() => handleClassSelection("medic")} />
                        <ClassIcon operatorClass={"guard"} active={selectedClass === "guard"} onClick={() => handleClassSelection("guard")} />
                        <ClassIcon operatorClass={"sniper"} active={selectedClass === "sniper"} onClick={() => handleClassSelection("sniper")} />
                        <ClassIcon operatorClass={"specialist"} active={selectedClass === "specialist"} onClick={() => handleClassSelection("specialist")} />
                        <ClassIcon operatorClass={"supporter"} active={selectedClass === "supporter"} onClick={() => handleClassSelection("supporter")} />
                        <ClassIcon operatorClass={"defender"} active={selectedClass === "defender"} onClick={() => handleClassSelection("defender")} />
                        <ClassIcon operatorClass={"vanguard"} active={selectedClass === "vanguard"} onClick={() => handleClassSelection("vanguard")} />
                    </div>
                    <div className={"grid grid-cols-5 gap-4 h-[25vh] overflow-y-auto px-4 content-start"}>
                        {filteredOperators.map(operator => (
                            <OperatorIcon
                                key={operator.charid}
                                operator={{
                                    id: operator.charid,
                                    name: operator.name,
                                    rarity: operator.rarity,
                                    class: operator.profession as OperatorClass,
                                    subclass: operator.archetype,
                                }}
                                isSelected={selectedOperators.includes(operator.charid)}
                                isBanned={bannedOperators.includes(operator.charid)}
                                onClickFn={() => handleOperatorSelection(operator.charid)}
                            />
                        ))}
                    </div>
                    <div className={"w-full px-6"}>
                        <div className={"text-red-300 italic text-center mb-2 font-extrabold"}>
                            Hãy chọn Operator bạn muốn cấm (
                            {selectedOperators.length}
                            /6)
                        </div>
                        <div className={"grid grid-cols-6 gap-2 h-32 content-center"}>
                            {Array.from({ length: 6 }, (_, index) => {
                                const selectedCharId = selectedOperators[index];
                                const selectedOp = selectedCharId ? operators.find(op => op.charid === selectedCharId) : null;

                                return (
                                    <div
                                        key={index}
                                        className={"h-20 flex items-start justify-center cursor-pointer"}
                                        onClick={() => selectedCharId && removeSelectedOperator(selectedCharId)}
                                    >
                                        {selectedOp
                                            ? (
                                                    <OperatorIcon
                                                        operator={{
                                                            id: selectedOp.charid,
                                                            name: selectedOp.name,
                                                            rarity: selectedOp.rarity,
                                                            class: selectedOp.profession as OperatorClass,
                                                            subclass: selectedOp.archetype,
                                                        }}
                                                        isSelected={false}
                                                        onClickFn={() => removeSelectedOperator(selectedCharId)}
                                                    />
                                                )
                                            : (
                                                    <div className={"text-gray-500 text-xs text-center"}>
                                                        Empty
                                                    </div>
                                                )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 content-stretch w-screen"}>
                        <button
                            type={"button"}
                            className={"btn bg-red-400 mx-6"}
                            disabled={!isSbConnected || selectedOperators.length === 0 || getDisplayTime() <= 0}
                            onClick={async () => {
                                await handleBanSubmission();
                            }}
                        >
                            BAN
                        </button>
                        <button type={"button"} className={"btn bg-green-400 text-black mx-6"} onClick={() => setSelectedOperators([])}>CLEAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
