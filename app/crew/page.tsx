"use client";

import type { CrewMember } from "@/lib/vns";
import { useEffect, useRef, useState } from "react";
import MemberBox from "@/components/MemberBox";
import PageTitle from "@/components/PageTitle";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrewMembers from "@/public/crew/_crew.json";

type HRListProps = {
    members: CrewMember[];
};

function CrewList(props: HRListProps) {
    const eliteMembers = props.members.slice(0, 3);
    const remainingMembers = props.members.slice(3);

    return (
        <>
            {/* The reason for the horrible code is that the CEO want to have 4-5-5 layout. */}
            {/* But it looks utterly dogshit on mobile, so falling back to the default one on that. */}
            <div className={"hidden place-content-center-safe lg:block"}>
                <div
                    className={"mx-12 mb-4 flex flex-col flex-wrap place-content-evenly md:flex-row"}
                >
                    {eliteMembers.map((member) => {
                        return (
                            <MemberBox
                                key={member.name}
                                name={member.name}
                                quote={member.quote}
                                roles={member.roles}
                            />
                        );
                    })}
                </div>
                <div
                    className={"grid place-content-center-safe sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5"}
                >
                    {remainingMembers.map((member) => {
                        return (
                            <div key={member.name} className={"w-full md:w-auto"}>
                                <MemberBox
                                    name={member.name}
                                    quote={member.quote}
                                    roles={member.roles}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* The other-than-hell layout. */}
            <div
                className={"grid grid-cols-1 place-content-center-safe md:grid-cols-3 lg:hidden"}
            >
                {props.members.map((member) => {
                    return (
                        <div key={member.name} className={"w-full md:w-auto"}>
                            <MemberBox name={member.name} quote={member.quote} roles={member.roles} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function PartnerList(props: HRListProps) {
    return (
        <>
            <div
                className={"grid grid-cols-1 place-content-center-safe md:grid-cols-3 lg:grid-cols-4"}
            >
                {props.members.map((member) => {
                    return (
                        <MemberBox
                            key={member.name}
                            name={member.name}
                            quote={member.quote}
                            roles={member.roles}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default function CrewPage() {
    const [tab, setTab] = useState<string>("dreamchasers");
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("crew-tab");
        if (stored && stored !== "") {
            setTab(stored);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("crew-tab", tab);
    }, [tab]);

    const members = CrewMembers.members;
    const partners = CrewMembers.partners;

    function handleTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX;
    };

    function handleTouchMove(e: React.TouchEvent) {
        touchEndX.current = e.touches[0].clientX;
    };

    function handleTouchEnd() {
        if (touchStartX.current === null || touchEndX.current === null)
            return;
        const deltaX = touchEndX.current - touchStartX.current;
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0 && tab === "dreamchasers") {
                setTab("dreamchasers");
            } else if (deltaX > 0 && tab === "partners") {
                setTab("partners");
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className={"h-visible bg-vns flex flex-col"}>
            <PageTitle
                favorText={"Những người đã góp hết sức mình để mang đến cho các bạn những cái event cực cháy."}
                title={"Tổ chức"}
            />
            <div
                className={"sticky top-[80px] z-0 h-[calc(100vh-80px)] place-content-center-safe"}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onTouchStart={handleTouchStart}
            >
                <Tabs className={"size-full"} value={tab} onValueChange={setTab}>
                    <TabsList className={"h-12 w-full rounded-none border-b bg-neutral-950 p-1"}>
                        <TabsTrigger
                            className={
                                "w-1/2 rounded-none py-3 text-lg font-semibold text-neutral-300 transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:hover:bg-neutral-800/60"
                            }
                            value={"dreamchasers"}
                        >
                            "Dreamchasers"
                        </TabsTrigger>
                        <Separator orientation={"vertical"} />
                        <TabsTrigger
                            className={
                                "w-1/2 rounded-none border-r py-3 text-lg font-semibold text-neutral-300 transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:hover:bg-neutral-800/60"
                            }
                            value={"partners"}
                        >
                            Hợp tác phát triển
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent className={"mx-4 overflow-y-auto pt-10"} value={"dreamchasers"}>
                        <CrewList members={members} />
                    </TabsContent>

                    <TabsContent className={"mx-4 overflow-y-auto pt-10"} value={"partners"}>
                        <PartnerList members={partners} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
